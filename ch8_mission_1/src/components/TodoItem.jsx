import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  return (
    <ItemContainer>
      <input 
        type="checkbox" 
        checked={todo.checked}
        onChange={() => onUpdate({ ...todo, checked: !todo.checked })}
      />
      <Content>
        <Link to={`/todo/${todo.id}`}>
          <h3>{todo.title}</h3>
        </Link>
        <p>{todo.content}</p>
      </Content>
      <Actions>
        <EditButton onClick={() => {/* 수정 로직 추가 */}}>수정</EditButton>
        <DeleteButton onClick={() => onDelete(todo.id)}>삭제</DeleteButton>
      </Actions>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;
const EditButton = styled.button`
  background-color: #9E9E9E; /* 회색 */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

export default TodoItem;