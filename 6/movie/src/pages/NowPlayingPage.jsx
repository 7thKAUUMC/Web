// pages/NowPlayingPage.jsx
import React from 'react';
import MoviesList from '../components/MoviesList';

const API_KEY = import.meta.env.VITE_API_KEY;
const NOW_PLAYING_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`;

const NowPlayingPage = () => {
  return <MoviesList title="현재 상영중인 영화" apiUrl={NOW_PLAYING_URL} />;
};

export default NowPlayingPage;
