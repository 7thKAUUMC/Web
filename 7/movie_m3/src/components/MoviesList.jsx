import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const fetchMovies = async ({ pageParam = 1, apiUrl }) => {
  const response = await axios.get(apiUrl, {
    params: { page: pageParam },
  });
  return {
    results: response.data.results,
    nextPage: pageParam + 1,
    totalPages: response.data.total_pages,
  };
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

const LoadMoreButton = styled.button`
  background-color: #f0a500;
  color: #000;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #555;
    color: #777;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  margin: 20px auto;
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #f0a500;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const MoviesList = ({ title, apiUrl }) => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [apiUrl],
    queryFn: ({ pageParam = 1 }) => fetchMovies({ pageParam, apiUrl }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
    enabled: !!apiUrl,
  });

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  // 로딩 중일 때 Skeleton UI와 Spinner를 표시
  if (isLoading) {
    return (
      <Container>
        <Spinner />
        <MoviesGrid>
          {Array.from({ length: 6 }).map((_, index) => (
            <MovieCard key={index}>
              <Skeleton height={300} />
              <Skeleton width="80%" style={{ margin: '10px auto' }} />
              <Skeleton width="60%" style={{ margin: '0 auto 10px' }} />
            </MovieCard>
          ))}
        </MoviesGrid>
      </Container>
    );
  }

  if (isError) return <p>Failed to load movies.</p>;

  return (
    <Container>
      <h1>{title}</h1>
      <MoviesGrid>
        {data.pages.map((page) =>
          page.results.map((movie) => (
            <MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
              <MoviePoster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <MovieTitle>{movie.title}</MovieTitle>
              <ReleaseDate>{movie.release_date}</ReleaseDate>
            </MovieCard>
          ))
        )}
      </MoviesGrid>
      {hasNextPage && (
        <LoadMoreButton onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? <Spinner /> : "Load More"}
        </LoadMoreButton>
      )}
    </Container>
  );
};

export default MoviesList;
