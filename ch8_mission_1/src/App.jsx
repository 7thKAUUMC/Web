import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import styled from 'styled-components';

const queryClient = new QueryClient();

function App() {
  const { 
    todos, 
    isLoading, 
    isError, 
    error,
    searchTerm, 
    setSearchTerm, 
    createTodoMutation, 
    deleteTodoMutation, 
    updateTodoMutation 
  } = useTodos();

  const handleCreateTodo = (todoData) => {
    createTodoMutation.mutate(todoData);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <h1>Todo 리스트</h1>
        
        <SearchInput 
          placeholder="할 일 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <TodoForm onCreateTodo={handleCreateTodo} />

        {isLoading && <LoadingMessage>로딩 중...</LoadingMessage>}
        {isError && <ErrorMessage>오류 발생: {error.message}</ErrorMessage>}

        <TodoList>
          {todos.map(todo => (
            <TodoItem key={todo.id}>
              <input 
                type="checkbox" 
                checked={todo.checked}
                onChange={() => updateTodoMutation.mutate({
                  id: todo.id, 
                  checked: !todo.checked
                })}
              />
              <TodoContent>
                <h3>{todo.title}</h3>
                <p>{todo.content}</p>
              </TodoContent>
              <TodoActions>
                <DeleteButton onClick={() => deleteTodoMutation.mutate({ id: todo.id })}>
                  삭제
                </DeleteButton>
              </TodoActions>
            </TodoItem>
          ))}
        </TodoList>
        <ReactQueryDevtools initialIsOpen={false} />
      </AppContainer>
    </QueryClientProvider>
  );
}

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TodoContent = styled.div`
  flex-grow: 1;
`;

const TodoActions = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
`;

export default App;