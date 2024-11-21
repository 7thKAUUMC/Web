import React from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoList from '../components/TodoList';
import TodoSearch from '../components/TodoSearch';
import styled from 'styled-components';

const TodoListPage = () => {
  const { 
    todos, 
    isLoading, 
    isError, 
    error, 
    searchTerm, 
    setSearchTerm, 
    updateTodoMutation, 
    deleteTodoMutation 
  } = useTodos();

  if (isLoading) return <LoadingMessage>로딩 중...</LoadingMessage>;
  if (isError) return <ErrorMessage>오류 발생: {error.message}</ErrorMessage>;

  return (
    <PageContainer>
      <h1>Todo 리스트</h1>
      <TodoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TodoList 
        todos={todos} 
        onUpdate={(todo) => updateTodoMutation.mutate(todo)} 
        onDelete={(id) => deleteTodoMutation.mutate({ id })} 
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
`;

export default TodoListPage;