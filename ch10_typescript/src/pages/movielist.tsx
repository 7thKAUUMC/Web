import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCustomFetch from "../hooks/useCustomFetch";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

const MovieList: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  let url = "";

  if (category === "now-playing") url = `/movie/now_playing`;
  else if (category === "popular") url = `/movie/popular`;
  else if (category === "top-rated") url = `/movie/top_rated`;
  else if (category === "up-coming") url = `/movie/upcoming`;

  // 커스텀 훅으로 데이터 가져오기
  const { data, isLoading, isError } = useCustomFetch(url);

  if (isLoading) {
    return <LoadingText>로딩중...</LoadingText>;
  }

  if (isError) {
    return <ErrorText>문제가 발생했습니다.</ErrorText>;
  }

  const handleCardClick = (movieId: number) => {
    console.log("Navigating to movie ID:", movieId); // 에러체크용
    navigate(`/movie/${movieId}`); // 클릭 시 영화 상세 페이지로 이동
  };

  return (
    <MovieGrid>
      {data.results?.map((movie: Movie) => (
        <MovieCard key={movie.id} onClick={() => handleCardClick(movie.id)}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <MovieInfo>
            <p>{movie.title}</p>
          </MovieInfo>
        </MovieCard>
      ))}
    </MovieGrid>
  );
};

export default MovieList;

const LoadingText = styled.p`
  text-align: center;
  color: white;
`;

const ErrorText = styled.p`
  text-align: center;
  color: red;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const MovieCard = styled.div`
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const MovieInfo = styled.div`
  text-align: center;
  color: white;
  margin-top: 10px;
`;