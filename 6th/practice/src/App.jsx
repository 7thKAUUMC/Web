import React, { useContext } from "react";
import { TodoContext } from "./context/TodoContext";
import TodoItem from "./components/Item/item";
import styled from "styled-components";
import Button from "./components/Button/button";
import Input from "./components/Input/input";

function App() {
  const {
    todos,
    text,
    setText,
    handleSubmit,
    editingId,
    setEditingId,
    editText,
    setEditText,
    deleteTodo,
    updateTodo,
  } = useContext(TodoContext);

  return (
    <AppContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="할 일을 입력하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit">할 일 등록</Button>
      </FormContainer>
      <TodoList>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
            setEditingId={setEditingId}
          />
        ))}
      </TodoList>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const FormContainer = styled.form`
  margin: 20px 0;
  display: flex;
  gap: 10px;
`;

const TodoList = styled.div`
  margin-top: 20px;
`;

export default App;
