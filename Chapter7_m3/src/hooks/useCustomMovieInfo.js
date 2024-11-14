import { useEffect, useState } from 'react';
import { axiosInstance } from '../apis/axios-instance';

const useCustomMovieInfo = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/movie/${movieId}`, {
          params: {
            language: 'ko-KR',
            append_to_response: 'credits',
          },
        });
        setMovie(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieInfo();
  }, [movieId]);

  return { movie, loading, error };
};

export default useCustomMovieInfo;
