import styled from "styled-components";

export const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const TodoText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const TodoId = styled.p`
  margin-right: 10px;
  font-weight: bold;
`;

export const TodoTask = styled.p`
  margin-right: 20px;
`;
