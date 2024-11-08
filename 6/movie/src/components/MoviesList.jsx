// components/MoviesList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가

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
  cursor: pointer; /* 커서 포인터 추가 */
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
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 선언

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(apiUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error('영화 데이터를 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    fetchMovies();
  }, [apiUrl]);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`); // 영화 ID 기반으로 경로 설정
  };

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
