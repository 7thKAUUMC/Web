import React from "react";
import styled from "styled-components";
import { useFavorites } from "../context/FavoritesContext";

const HomePage = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <Container>
        <HomeTitle>Welcome to YOONCHA</HomeTitle>
      </Container>
    );
  }

  return (
    <MovieGrid>
      {favorites.map((movie) => (
        <MovieCard key={movie.id}>
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

export default HomePage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`;

const HomeTitle = styled.p`
  text-align: center;
  color: #282828;
  font-size: 80px;
  font-weight: 900;
`;

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
