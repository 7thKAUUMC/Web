// src/App.jsx
import React, { useContext } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import { TodoContext, TodoProvider } from './context/TodoContext';

function AppContent() {
  const {
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
  } = useContext(TodoContext);

  return (
    <div className="app">
      <h1>Todo list</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <Input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="할 일을 입력해주세요" 
        />
        <Button onClick={addToDo} label="할 일 등록" type="submit" className="add-button" />
      </form>
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            {editingId !== todo.id ? (
              <div className="todo-content">
                <p>{todo.task}</p>
              </div>
            ) : (
              <div className="todo-editing">
                <Input 
                  defaultValue={todo.task} 
                  onChange={(e) => setEditText(e.target.value)} 
                />
              </div>
            )}
            <div className="todo-actions">
              <Button 
                onClick={() => deleteTodo(todo.id)} 
                label="삭제" 
                className="delete-button" 
              />
              {editingId === todo.id ? (
                <Button 
                  onClick={() => updateTodo(editingId, editText)} 
                  label="완료" 
                  className="edit-button" 
                />
              ) : (
                <Button 
                  onClick={() => setEditingId(todo.id)} 
                  label="수정" 
                  className="edit-button" 
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}

export default App;
