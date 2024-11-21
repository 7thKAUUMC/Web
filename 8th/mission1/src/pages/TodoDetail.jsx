import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getTodo, patchTodo, deleteTodo } from "../apis/todo";
import Button from "../components/Button/button";
import Input from "../components/Input/input";

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fetchTodo = async () => {
    try {
      setIsLoading(true);
      const data = await getTodo({ id });
      setTodo(data);
      setEditTitle(data.title);
      setEditContent(data.content);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      await patchTodo({ id, title: editTitle, content: editContent });
      await fetchTodo();
      setIsEditing(false);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteTodo({ id });
      navigate("/todo");
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    try {
      setIsLoading(true);
      await patchTodo({ id, checked: !todo.checked });
      await fetchTodo();
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage>에러가 발생했습니다: {isError.message}</ErrorMessage>;
  }

  return (
    <Container>
      <DetailHeader>
        <Title>Todo Details</Title>
        <TodoMeta>
          <MetaItem>ID: {todo?.id}</MetaItem>
          <MetaItem>
            Status:
            <StatusBadge $completed={todo?.checked}>
              {todo?.checked ? "완료" : "진행중"}
            </StatusBadge>
          </MetaItem>
        </TodoMeta>
      </DetailHeader>

      {todo && (
        <TodoContent>
          {isEditing ? (
            <>
              <Input
                name="editTitle"
                placeholder="제목을 입력해주세요."
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <Input
                name="editContent"
                placeholder="내용을 입력해주세요."
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <ActionGroup>
                <Button onClick={handleUpdate} disabled={isLoading}>
                  수정 완료
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="secondary">
                  취소
                </Button>
              </ActionGroup>
            </>
          ) : (
            <>
              <DisplayContent>
                <h2>{todo.title}</h2>
                <p>{todo.content}</p>
              </DisplayContent>
              <ActionGroup>
                <Button onClick={() => setIsEditing(true)}>수정</Button>
                <Button onClick={handleToggleStatus} variant="secondary">
                  {todo.checked ? "미완료로 변경" : "완료로 변경"}
                </Button>
                <Button onClick={handleDelete} variant="danger">
                  삭제
                </Button>
              </ActionGroup>
            </>
          )}
        </TodoContent>
      )}
    </Container>
  );
};

export default TodoDetail;

const Container = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const DetailHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 15px;
`;

const TodoMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  color: #666;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  background-color: ${(props) => (props.$completed ? "#52c41a" : "#faad14")};
  color: white;
`;

const TodoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DisplayContent = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;

  h2 {
    margin-bottom: 10px;
    color: #333;
  }

  p {
    color: #666;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(37, 117, 252, 0.2);
  border-top-color: #2575fc;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  background-color: #fff1f0;
  border: 1px solid #ffa39e;
  text-align: center;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
`;
