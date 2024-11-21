import styled from "styled-components";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import TodoDetail from "./pages/TodoDetail";
import { useEffect, useState } from "react";
import Button from "./components/Button/button";
import Form from "./components/Form/form";
import Input from "./components/Input/input";
import { useDebounce } from "./hooks/useDebounce";
import {
  getTodo,
  postTodo,
  getTodoList,
  patchTodo,
  deleteTodo,
} from "./apis/todo";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await getTodoList({ title: debouncedSearch });
      setTodos(response[0]);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [debouncedSearch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await postTodo({ title, content });
      setTitle("");
      setContent("");
      await fetchTodos(); // 목록 새로고침
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = async (id, checked) => {
    try {
      setIsLoading(true);
      await patchTodo({ id, checked });
      await fetchTodos(); // 상태 갱신
    } catch (error) {
      console.error("체크박스 업데이트 중 오류 발생", error);
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditContent(todo.content);
  };

  const handleUpdate = async (id) => {
    try {
      setIsLoading(true);
      await patchTodo({ id, title: editTitle, content: editContent });
      setEditingId(null);
      await fetchTodos(); // 상태 갱신
    } catch (error) {
      console.error("수정 중 오류 발생", error);
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await deleteTodo({ id });
      await fetchTodos(); // 상태 갱신
    } catch (error) {
      console.error("삭제 중 오류 발생", error);
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTodoClick = (id) => {
    navigate(`/todo/${id}`);
  };

  return (
    <Container>
      <Title> 💖 Todo List 💖 </Title>
      <Form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="제목으로 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Input
          name="title"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          name="content"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" disabled={isLoading || !title || !content}>
          추가
        </Button>
      </Form>
      {isLoading && <LoadingSpinner />}
      {isError && (
        <ErrorMessage>에러가 발생했습니다: {isError.message}</ErrorMessage>
      )}
      {todos?.map((todo) => (
        <div key={todo.id}>
          <TodoListContainer>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => handleCheckboxChange(todo.id, !todo.checked)}
              disabled={isLoading}
            />
            <p>{todo.id}</p>
            <TodoItemContainer>
              {editingId === todo.id ? (
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
                  <Button
                    onClick={() => handleUpdate(todo.id)}
                    disabled={isLoading}
                  >
                    수정 완료
                  </Button>
                </>
              ) : (
                <>
                  <p onClick={() => handleTodoClick(todo.id)}>{todo.title}</p>
                  <p onClick={() => handleTodoClick(todo.id)}>{todo.content}</p>
                  <Button onClick={() => handleEdit(todo)} disabled={isLoading}>
                    수정
                  </Button>
                </>
              )}

              <Button
                onClick={() => handleDelete(todo.id)}
                disabled={isLoading}
              >
                삭제
              </Button>
            </TodoItemContainer>
          </TodoListContainer>
        </div>
      ))}
    </Container>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/todo" element={<App />} />
      <Route path="/todo/:id" element={<TodoDetail />} />
    </Routes>
  </BrowserRouter>
);

export default AppWrapper;

const TodoItemContainer = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TodoListContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background: linear-gradient(135deg, #f6f8f9 0%, #e5ebee 100%);
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  & > * {
    margin-right: 10px;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 30px;
  font-weight: 800;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 10px;
  margin: 20px 0;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2575fc;
  }
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
