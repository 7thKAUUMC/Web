import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onUpdate, onDelete }) => {
  return (
    <ListContainer>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onUpdate={onUpdate} 
          onDelete={onDelete} 
        />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default TodoList;