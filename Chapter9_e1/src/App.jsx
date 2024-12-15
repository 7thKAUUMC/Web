import React from 'react';
import './App.css';
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="app">
      <h1>ToDo List</h1>
      <div className="browser-tabs">
        <div className="browser-circle red"></div>
        <div className="browser-circle yellow"></div>
        <div className="browser-circle green"></div>
      </div>
      <InputTodo />
      <TodoList />
    </div>
  );
}

export default App;
