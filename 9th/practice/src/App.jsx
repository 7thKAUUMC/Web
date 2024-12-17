import React from "react";
import TodoList from "./components/TodoList.jsx";
import InputTodo from "./components/InputTodo.jsx";

function App() {
  console.log("App component is rendering");
  return (
    <div>
      <InputTodo />
      <TodoList />
    </div>
  );
}

export default App;
