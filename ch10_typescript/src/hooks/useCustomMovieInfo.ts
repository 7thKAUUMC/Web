import { useEffect, useState } from 'react';
import { axiosInstance } from '../apis/axios-instance';

interface Credit {
  id: number;
  profile_path: string;
  name: string;
}

interface Movie {
  title: string;
  vote_average: number;
  runtime: number;
  release_date: string;
  overview: string;
  poster_path: string;
  credits: {
    cast: Credit[];
  };
}

interface UseCustomMovieInfoResult {
  movie: Movie | null;
  loading: boolean;
  error: boolean;
}

const useCustomMovieInfo = (movieId: string): UseCustomMovieInfoResult => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axiosInstance.get<Movie>(`/movie/${movieId}`, {
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