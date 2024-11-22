import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RootLayout from './layout/root-layout';
import HomePage from './pages/home';
import NotFound from './pages/notfound';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import SearchPage from './pages/search';
import MoviesPage from './pages/movies';
import MovieList from './pages/movielist';
import MovieInfo from './pages/movieinfo';
import NowPlaying from './pages/NowPlaying';
import Popular from './pages/Popular';
import TopRated from './pages/TopRated';
import UpComing from './pages/UpComing';
import { FavoritesProvider } from './context/FavoritesContext'; // 추가한 FavoritesProvider

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <SignupPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'movies',
        element: <MoviesPage />
      },
      { path: 'movies/now-playing', element: <NowPlaying /> },
      { path: 'movies/popular', element: <Popular /> },
      { path: 'movies/top-rated', element: <TopRated /> },
      { path: 'movies/up-coming', element: <UpComing /> },
      { path: 'movie/:movieId', element: <MovieInfo /> }
    ]
  }
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider> 
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App;