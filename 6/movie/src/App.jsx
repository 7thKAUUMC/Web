import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';

import HomePage from "./pages/home.jsx";
import SignInPage from './pages/signin.jsx';
import SignOutPage from './pages/signout.jsx';
import SearchPage from './pages/search.jsx';
import MoviesPage from "./pages/movies.jsx";
import PopularMoviesPage from "./pages/PopularMoviesPage.jsx";
import NotFound from "./pages/not-found.jsx";
import RootLayout from "./layout/root-layout.jsx";
import NowPlayingPage from './pages/NowPlayingPage.jsx';
import TopRatedMoviesPage from './pages/TopRatedMoviesPage.jsx';
import UpcomingMoviesPage from './pages/UpcomingMoviesPage.jsx';
import MovieDetailPage from './pages/MovieDetailsPage.jsx';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Arial', sans-serif;
    background-color: #000;
    color: white;
  }
`;

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
                path: 'signin',
                element: <SignInPage />
            },
            {
                path: 'signout',
                element: <SignOutPage />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: 'movies',
                element: <MoviesPage />,
            },
            {
                path: 'movies/now-playing', 
                element: <NowPlayingPage />
            },
            {
                path: 'movies/popular', 
                element: <PopularMoviesPage />,
            },
            {
                path: 'movies/top-rated', 
                element: <TopRatedMoviesPage />,
            },
            {
                path: 'movies/up-coming', 
                element: <UpcomingMoviesPage />,
            },
            {
                path: 'movies/:movieId', 
                element: <MovieDetailPage />,
            },
        ]
    }
]);

function App() {
    return (
        <>
            <GlobalStyle /> {/* 전역 스타일 적용 */}
            <RouterProvider router={router} />
        </>
    );
}

export default App;
