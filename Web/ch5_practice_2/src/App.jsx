import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from './layout/root-layout'
import HomePage from './pages/home';
import NotFound from './pages/notfound';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import SearchPage from './pages/search';
import MoviesPage from './pages/movies';
import MovieList from './pages/movielist';
import MovieDetail from './pages/MovieDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <NotFound/>,
    children : [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'signup',
        element: <SignupPage/>
      },
      {
        path: 'search',
        element: <SearchPage/>
      },
      {
        path: 'movies',
        element: <MoviesPage/>
      },
      {
        path: 'movies/:category',
        element: <MovieList/>
      },
      {
        path: 'movie/:movieId',
        element: <MovieDetail/>
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
};

export default App