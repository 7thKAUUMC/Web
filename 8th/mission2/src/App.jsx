import styled from "styled-components";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTodoList, postTodo, deleteTodo, patchTodo } from "./apis/todo";
import { queryClient } from "./main";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const { data: todos, isPending } = useQuery({
    queryFn: () => getTodoList({ title: search }),
    queryKey: ["todos", search],
  });

  const { mutate: postTodoMutation } = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      setTitle("");
      setContent("");
    },
    onError: (error) => {
      console.error("Todo 생성 실패:", error);
    },
    onSettled: () => {
      setSearch("");
    },
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.error("Todo 삭제 실패:", error);
    },
  });

  const { mutate: patchTodoMutation } = useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.error("Todo 수정 실패:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    postTodoMutation({ title, content });
  };

  return (
    <AppWrapper>
      <AppContainer>
        <Title>✨ Todo List ✨</Title>

        <SearchContainer>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="할 일 검색하기..."
          />
        </SearchContainer>

        <Form onSubmit={handleSubmit}>
          <Input
            name="title"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            name="content"
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <SubmitButton type="submit">새로운 할 일 추가하기</SubmitButton>
        </Form>

        {isPending ? (
          <LoadingSpinner>로딩중...</LoadingSpinner>
        ) : (
          <TodoList>
            {todos[0].map((todo) => (
              <TodoItem key={todo.id} $checked={todo.checked}>
                <TodoCheckbox
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() =>
                    patchTodoMutation({ id: todo.id, checked: !todo.checked })
                  }
                />
                <TodoContent>
                  <TodoTitle $checked={todo.checked}>{todo.title}</TodoTitle>
                  <TodoText>{todo.content}</TodoText>
                </TodoContent>
                <DeleteButton
                  onClick={() => deleteTodoMutation({ id: todo.id })}
                >
                  삭제
                </DeleteButton>
              </TodoItem>
            ))}
          </TodoList>
        )}
      </AppContainer>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 20px;
`;

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
`;

const Title = styled.h1`
  text-align: center;
  color: #2d3436;
  font-size: 2.5rem;
  margin-bottom: 40px;
  font-weight: 700;
`;

const SearchContainer = styled.div`
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #6c5ce7;
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;
`;

const Input = styled.input`
  padding: 15px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #6c5ce7;
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
  }
`;

const SubmitButton = styled.button`
  padding: 15px;
  background: #6c5ce7;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #5f3dc4;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: ${(props) => (props.$checked ? "#f8f9fa" : "white")};
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
`;

const TodoCheckbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 15px;
  cursor: pointer;
`;

const TodoContent = styled.div`
  flex: 1;
`;

const TodoTitle = styled.h3`
  margin: 0;
  color: #2d3436;
  font-size: 1.1rem;
  text-decoration: ${(props) => (props.$checked ? "line-through" : "none")};
  opacity: ${(props) => (props.$checked ? 0.7 : 1)};
`;

const TodoText = styled.p`
  margin: 5px 0 0;
  color: #636e72;
  font-size: 0.9rem;
`;

const DeleteButton = styled.button`
  padding: 8px 15px;
  background: #ff7675;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #d63031;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  color: #6c5ce7;
  font-size: 1.1rem;
  padding: 20px;
`;
