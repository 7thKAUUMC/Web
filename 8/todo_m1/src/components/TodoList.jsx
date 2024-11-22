import React, { useState, useEffect } from "react";
import useCustomFetch from "../hooks/useCustomFetch";
import axiosInstance from "../api/axiosInstance";
import useDebounce from "../hooks/useDebounce"; // Import the debounce hook
import './TodoList.css'; // CSS 파일을 import

function TodoList({ todos, setTodos }) {
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState({ title: "", content: "" });

  // Debounced editContent
  const debouncedEditContent = useDebounce(editContent, 500); // 500ms debounce delay

  // Fetch todos using custom hook
  const { data: fetchedTodos, loading, error } = useCustomFetch("/todo");

  useEffect(() => {
    if (fetchedTodos) {
      setTodos(fetchedTodos);
    }
  }, [fetchedTodos, setTodos]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/todo/${id}`);
      alert(`${id}번 Todo가 삭제되었습니다.`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheck = async (id, checked) => {
    try {
      await axiosInstance.patch(`/todo/${id}`, { checked });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, checked } : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditStart = (todo) => {
    setEditingId(todo.id);
    setEditContent({ title: todo.title, content: todo.content });
  };

  const handleEditSave = async () => {
    if (debouncedEditContent.title !== editContent.title || debouncedEditContent.content !== editContent.content) {
      try {
        await axiosInstance.patch(`/todo/${editingId}`, debouncedEditContent);
        setEditingId(null);
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === editingId ? { ...todo, ...debouncedEditContent } : todo
          )
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id} className="listItem">
            {editingId === todo.id ? (
              <div className="editContainer">
                <input
                  type="text"
                  value={editContent.title}
                  onChange={(e) =>
                    setEditContent({ ...editContent, title: e.target.value })
                  }
                  className="input"
                />
                <textarea
                  value={editContent.content}
                  onChange={(e) =>
                    setEditContent({ ...editContent, content: e.target.value })
                  }
                  className="textarea"
                />
                <div className="buttonGroup">
                  <button className="saveButton" onClick={handleEditSave}>
                    수정
                  </button>
                  <button className="cancelButton" onClick={handleEditCancel}>
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className="todoContainer">
                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => handleCheck(todo.id, !todo.checked)}
                    className="checkbox"
                  />
                  <div>
                    <span
                      className="title"
                      style={{
                        textDecoration: todo.checked ? "line-through" : "none",
                        color: todo.checked ? "#aaa" : "#333",
                      }}
                    >
                      {todo.title}
                    </span>
                    <p className="content">
                      {todo.content}
                    </p>
                  </div>
                </div>
                <div className="buttonGroup">
                  <button
                    className="editButton"
                    onClick={() => handleEditStart(todo)}
                  >
                    수정
                  </button>
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(todo.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
