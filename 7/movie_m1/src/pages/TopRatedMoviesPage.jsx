// pages/TopRatedMoviesPage.jsx
import React from 'react';
import MoviesList from '../components/MoviesList';

const API_KEY = import.meta.env.VITE_API_KEY;
const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`;

const TopRatedMoviesPage = () => {
  return <MoviesList title="높은 평가를 받은 영화" apiUrl={TOP_RATED_URL} />;
};

export default TopRatedMoviesPage;
