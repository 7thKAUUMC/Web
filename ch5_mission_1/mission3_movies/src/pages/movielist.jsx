import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";

const MovieList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const urlMap = {
    "now-playing": "https://api.themoviedb.org/3/movie/now_playing",
    popular: "https://api.themoviedb.org/3/movie/popular",
    "top-rated": "https://api.themoviedb.org/3/movie/top_rated",
    "up-coming": "https://api.themoviedb.org/3/movie/upcoming",
  };

  console.log("Selected category:", category); // 카테고리 로그 출력

  const { data: movies, loading, error } = useFetch(urlMap[category], {
    params: { language: "ko", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmY5YWVjMmViMDNjODYzNWIwYTcxNDhmNTc1Mzg5YyIsIm5iZiI6MTcyOTc4MjI1My40MDY1OTUsInN1YiI6IjY3MTY4YzgxYmQ5MWM4MzgyOWQ3ODcwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t-VsQQ_g0rngEepLhqi7Nc3NjOk8D-QmNM6ry1p_ZXA",
    },
  });

  if (loading && !movies) return <p>로딩 중...</p>;
  if (error) {
    console.error("Fetch error:", error); // 에러 정보 출력
    return <p>오류가 발생했습니다: {error.message}</p>;
  }
  if (!movies || movies.length === 0) return <p>영화가 없습니다.</p>;

  const handleMovieClick = (movieId) => {
    if (movieId) {
      navigate(`/movie/${movieId}`);
    } else {
      console.error("영화 ID가 없습니다.");
    }
  };

  return (
    <MovieGrid>
      {movies.map((movie) => (
        <MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <MovieInfo>
            <MovieTitle>{movie.title}</MovieTitle>
            <ReleaseDate>{movie.release_date}</ReleaseDate>
          </MovieInfo>
        </MovieCard>
      ))}
    </MovieGrid>
  );
};

export default MovieList;

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 60px;
  gap: 20px;
  min-width: 1200px;
`;

const MovieCard = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
`;

const MoviePoster = styled.img`
  width: 120px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0px;
`;

const MovieInfo = styled.div`
  text-align: left;
`;

const MovieTitle = styled.p`
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 0px;
`;

const ReleaseDate = styled.p`
  font-size: 10px;
  color: #aaaaaa;
`;
