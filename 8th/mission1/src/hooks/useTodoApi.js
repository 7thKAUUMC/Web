import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const useTodoApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTodo = async (title, content) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/todo`, { title, content });
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getTodos = async (title = "") => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/todo${title ? `?title=${title}` : ""}`
      );
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getTodoById = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/todo/${id}`);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`${BASE_URL}/todo/${id}`, updates);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/todo/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
  };
};
