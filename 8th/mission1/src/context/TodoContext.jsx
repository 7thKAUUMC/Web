import { createContext, useState } from "react";
import {
  addTodo,
  deleteTodo,
  updateTodo as updateTodoService,
} from "../service/TodoService";

// 데이터를 담고 있음
export const TodoContext = createContext();

// 우산? 같은 역할.. App을 TodoContextProvider가 감싸고 있음
export function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState([
    { id: 1, task: "객체지향" },
    { id: 2, task: "Querydsl" },
  ]);

  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editText, setEditText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(todos, setTodos, text, setText);
    console.log("handleSubmit");
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const updateTodo = (id, text) => {
    updateTodoService(id, text, setTodos, setEditingId);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        text,
        setText,
        editingId,
        setEditingId,
        editText,
        setEditText,
        handleSubmit,
        deleteTodo: (id) => deleteTodo(id, setTodos),
        updateTodo,
        startEditing,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
