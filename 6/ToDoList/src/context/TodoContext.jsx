import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editText, setEditText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addToDo = () => {
    if (text.trim().length === 0) {
      alert("할 일을 입력해주세요");
      return;
    }
    setTodos((prev) => [
      ...prev, 
      { id: Math.floor(Math.random() * 100) + 2, task: text }
    ]);
    setText('');
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodos((prev) => 
      prev.map((item) => item.id === id ? { ...item, task: text } : item)
    );
    setEditingId('');
  };

  return (
    <TodoContext.Provider value={{
      todos,
      text,
      setText,
      editingId,
      setEditingId,
      editText,
      setEditText,
      handleSubmit,
      addToDo,
      deleteTodo,
      updateTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
} 