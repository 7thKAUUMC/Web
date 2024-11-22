// src/hooks/useFetch.js
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method, data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance({ method, url, data });
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
      throw error;
    }
  };

  return { fetchData, loading, error };
}
