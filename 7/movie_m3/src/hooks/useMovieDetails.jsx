import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

// API 호출 함수
const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR&append_to_response=credits`
  );
  return response.data;
};

const useMovieDetails = (movieId) => {
  const { data: movie, isLoading, isError, error } = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => fetchMovieDetails(movieId),
    enabled: !!movieId,
  });

  return { movie, loading: isLoading, error: isError ? error.message : null };
};

export default useMovieDetails;
