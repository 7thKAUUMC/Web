import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([
    { id: 1, task: 'To Do 만들어보기' },
    { id: 2, task: '준현 재현 주원 현우 성민' },
  ]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100) + 2, task: text },
    ]);
    setText('');
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingId('');
  };

  return (
    <TodoContext.Provider 
      value={{ 
        todos, 
        text, 
        setText, 
        editingId, 
        setEditingId, 
        editText, 
        setEditText,
        addTodo,
        deleteTodo,
        updateTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}