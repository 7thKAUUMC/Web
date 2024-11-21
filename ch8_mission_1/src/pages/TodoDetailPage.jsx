import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodo, patchTodo, deleteTodo } from '../apis/todo';
import styled from 'styled-components';

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const { data: todo, isLoading, isError } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => getTodo({ id: Number(id) }),
    onSuccess: (data) => {
      setEditedTitle(data.title);
      setEditedContent(data.content);
    }
  });

  const updateTodoMutation = useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todo', id]);
      setIsEditing(false);
    }
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      navigate('/');
    }
  });

  const handleUpdate = () => {
    updateTodoMutation.mutate({
      id: Number(id),
      title: editedTitle,
      content: editedContent
    });
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류 발생</div>;

  return (
    <DetailContainer>
      {isEditing ? (
        <>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <ButtonGroup>
            <SaveButton onClick={handleUpdate}>저장</SaveButton>
            <CancelButton onClick={() => setIsEditing(false)}>취소</CancelButton>
          </ButtonGroup>
        </>
      ) : (
        <>
          <h1>{todo.title}</h1>
          <p>{todo.content}</p>
          <DetailInfo>
            <p>생성일: {new Date(todo.createdAt).toLocaleString()}</p>
            <p>최종 수정일: {new Date(todo.updatedAt).toLocaleString()}</p>
            <p>상태: {todo.checked ? '완료' : '진행 중'}</p>
          </DetailInfo>
          <ButtonGroup>
            <EditButton onClick={() => setIsEditing(true)}>수정</EditButton>
            <DeleteButton onClick={() => deleteTodoMutation.mutate({ id: Number(id) })}>
              삭제
            </DeleteButton>
            <BackButton onClick={() => navigate('/')}>돌아가기</BackButton>
          </ButtonGroup>
        </>
      )}
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const DetailInfo = styled.div`
  margin: 20px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const BaseButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EditButton = styled(BaseButton)`
  background-color: #2196F3;
  color: white;
`;

const SaveButton = styled(BaseButton)`
  background-color: #4CAF50;
  color: white;
`;

const DeleteButton = styled(BaseButton)`
  background-color: #f44336;
  color: white;
`;

const CancelButton = styled(BaseButton)`
  background-color: #9E9E9E;
  color: white;
`;

const BackButton = styled(BaseButton)`
  background-color: #607D8B;
  color: white;
`;

export default TodoDetailPage;