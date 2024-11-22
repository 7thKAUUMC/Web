import { useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function Home() {
  const [todos, setTodos] = useState([]); // 상태 관리

  const addTodo = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]); // 새 Todo 추가
  };

  const updateTodo = (updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    ); // Todo 업데이트
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Todo List</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} setTodos={setTodos} updateTodo={updateTodo} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // 화면 전체를 차지하도록 설정
    backgroundColor: "#fff", // 배경을 흰색으로 설정
    fontFamily: "'Arial', sans-serif", // 기본 글꼴 설정
    height: "100%", // 화면 크기 전체 사용
  },
  content: {
    textAlign: "center", // 텍스트 가운데 정
  },
  heading: {
    fontSize: "36px",
    color: "#333",
  },
};

export default Home;
