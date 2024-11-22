// src/components/TodoForm.js
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import './TodoForm.css';  // CSS 파일을 import

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { fetchData, loading, error } = useFetch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTodo = await fetchData("/todo", "POST", { title, content });
      addTodo(newTodo);
      alert("Todo created!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating todo:", error);
      alert("Failed to create todo!");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input-field"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="input-field"
        style={{ height: "100px" }} // Inline style to modify height only
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? "Adding..." : "추가"}
      </button>
      {error && <p className="error">Failed to create todo. Please try again.</p>}
    </form>
  );
}

export default TodoForm;
