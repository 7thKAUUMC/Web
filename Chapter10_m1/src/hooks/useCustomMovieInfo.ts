import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axios-instance";

interface Movie {
  [key: string]: any; // 추가 속성 허용
}

const useCustomMovieInfo = (movieId: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/movie/${movieId}`, {
          params: {
            language: "ko-KR",
            append_to_response: "credits",
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
