import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function TodoDetail() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/todo/${id}`).then((response) => {
      setTodo(response.data);
    });
  }, [id]);

  if (!todo) return <p>Loading...</p>;

  return (
    <div>
      <h2>{todo.title}</h2>
      <p>{todo.content}</p>
      <p>Completed: {todo.checked ? "Yes" : "No"}</p>
    </div>
  );
}

export default TodoDetail;
