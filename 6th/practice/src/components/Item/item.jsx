import React from "react";
import Button from "../Button/button";
import Input from "../Input/input";
import { TodoItemContainer, TodoText, TodoId, TodoTask } from "./item.style.js";

function TodoItem({
  todo,
  editingId,
  editText,
  setEditText,
  deleteTodo,
  updateTodo,
  setEditingId,
}) {
  return (
    <TodoItemContainer key={todo.id}>
      {editingId !== todo.id ? (
        <TodoText>
          <TodoId>{todo.id}.</TodoId>
          <TodoTask>{todo.task}</TodoTask>
        </TodoText>
      ) : (
        <Input value={editText} onChange={(e) => setEditText(e.target.value)} />
      )}
      <Button onClick={() => deleteTodo(todo.id)}>삭제하기</Button>

      {editingId === todo.id ? (
        <Button onClick={() => updateTodo(editingId, editText)}>
          수정 완료
        </Button>
      ) : (
        <Button onClick={() => setEditingId(todo.id)}>수정 진행</Button>
      )}
    </TodoItemContainer>
  );
}

export default TodoItem;
