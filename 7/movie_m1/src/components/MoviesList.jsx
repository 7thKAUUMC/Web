import React from 'react';
import { useQuery } from '@tanstack/react-query';  // TanStack Query 추가
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// API 호출 함수
const fetchMovies = async (apiUrl) => {
  const response = await axios.get(apiUrl);
  return response.data.results;  // 결과만 반환
};

const Container = styled.div`
  background-color: #000;
  color: white;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;

const MovieCard = styled.div`
  background-color: #222;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 2px solid #444;
`;

const MovieTitle = styled.h3`
  padding: 10px;
  font-size: 15px;
  color: #fff;
  transition: color 0.2s;
  &:hover {
    color: #f0a500;
  }
`;

const ReleaseDate = styled.p`
  padding: 0 10px 10px;
  font-size: 14px;
  color: #bbb;
`;

const MoviesList = ({ title, apiUrl }) => {
  const navigate = useNavigate();

  // TanStack Query를 사용하여 데이터를 호출합니다.
  const { data: movies, isLoading, isError } = useQuery({
    queryKey: [apiUrl],  // apiUrl을 queryKey로 설정
    queryFn: () => fetchMovies(apiUrl),
    enabled: !!apiUrl,  // apiUrl이 유효할 때만 쿼리 실행
  });

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  // 로딩 중일 때 또는 에러가 발생했을 때 처리
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load movies.</p>;

  return (
    <Container>
      <h1>{title}</h1>
      <MoviesGrid>
        {movies.map((movie) => (
          <MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            <MoviePoster 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
            />
            <MovieTitle>{movie.title}</MovieTitle>
            <ReleaseDate>{movie.release_date}</ReleaseDate>
          </MovieCard>
        ))}
      </MoviesGrid>
    </Container>
  );
};

export default MoviesList;
