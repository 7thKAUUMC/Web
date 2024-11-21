import React from "react";
import Button from "../Button/button";
import Input from "../Input/input";
import {
  TodoItemContainer,
  TodoText,
  TodoId,
  TodoTask,
  Checkbox,
} from "./item.style.js";

function TodoItem({
  todo,
  editingId,
  editText,
  setEditText,
  deleteTodo,
  updateTodo,
  setEditingId,
  onUpdate,
}) {
  const handleCheckboxChange = async () => {
    await updateTodo(todo.id, { checked: !todo.checked });
    onUpdate(); // 목록 새로고침
  };

  return (
    <TodoItemContainer>
      <Checkbox
        type="checkbox"
        checked={todo.checked}
        onChange={handleCheckboxChange}
      />
      {editingId !== todo.id ? (
        <TodoText>
          <TodoId>{todo.id}.</TodoId>
          <TodoTask checked={todo.checked}>{todo.title}</TodoTask>
          <TodoTask checked={todo.checked}>{todo.content}</TodoTask>
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
        <Button onClick={() => setEditingId(todo.id)}>수정하기</Button>
      )}
    </TodoItemContainer>
  );
}

export default TodoItem;
