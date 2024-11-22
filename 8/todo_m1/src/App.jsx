import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo/:id" element={<TodoDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // 전체 화면을 차지하도록 설정
    backgroundColor: "#fff", // 배경을 흰색으로 설정
    fontFamily: "'Arial', sans-serif", // 기본 글꼴 설정
  },
};

export default App;
