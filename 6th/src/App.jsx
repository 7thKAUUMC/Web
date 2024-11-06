import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";
import Movies from "./pages/Movies/movies";
import Search from "./pages/Search/search";
import NowPlaying from "./pages/NowPlaying/nowPlaying";
import Popular from "./pages/Popular/popular";
import TopRated from "./pages/TopRated/topRated";
import Upcoming from "./pages/Upcoming/upcoming";
import MovieDetail from "./pages/MovieDetail/movieDetail";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies/now-playing" element={<NowPlaying />} />
        <Route path="/movies/popular" element={<Popular />} />
        <Route path="/movies/top-rated" element={<TopRated />} />
        <Route path="/movies/up-coming" element={<Upcoming />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
