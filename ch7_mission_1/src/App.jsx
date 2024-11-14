import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query'; // 추가
import RootLayout from './layout/root-layout';  
import HomePage from './pages/home';
import NotFound from './pages/notfound';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import SearchPage from './pages/search';
import MoviesPage from './pages/movies';
import MovieList from './pages/movielist';
import MovieDetail from './pages/MovieDetail';

const queryClient = new QueryClient(); // 추가

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
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  }
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}> {/* 추가 */}
        <RouterProvider router={router} />
      </QueryClientProvider> {/* 추가 */}
    </AuthProvider>
  );
}

export default App;