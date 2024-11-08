// hooks/useFetchMovies.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchMovies = (apiUrl) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(apiUrl);
        setMovies(response.data.results);
      } catch (err) {
        setError('영화 데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiUrl]);

  return { movies, loading, error };
};

export default useFetchMovies;
