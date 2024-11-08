// pages/UpcomingMoviesPage.jsx
import React from 'react';
import MoviesList from '../components/MoviesList';

const API_KEY = import.meta.env.VITE_API_KEY;
const UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1`;

const UpcomingMoviesPage = () => {
  return <MoviesList title="개봉 예정인 영화" apiUrl={UPCOMING_URL} />;
};

export default UpcomingMoviesPage;
