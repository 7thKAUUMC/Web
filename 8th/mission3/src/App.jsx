import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/signup";
import Movies from "./pages/Movies/movies";
import Search from "./pages/Search/search";
import NowPlaying from "./pages/NowPlaying/nowPlaying";
import Popular from "./pages/Popular/popular";
import TopRated from "./pages/TopRated/topRated";
import Upcoming from "./pages/Upcoming/upcoming";
import MovieDetail from "./pages/MovieDetail/movieDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotFound from "./pages/not-found";
import SubscribePage from "./pages/Subscribe/subscribe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movies",
        children: [
          {
            index: true,
            element: <Movies />,
          },
          {
            path: "now-playing",
            element: <NowPlaying />,
          },
          {
            path: "popular",
            element: <Popular />,
          },
          {
            path: "top-rated",
            element: <TopRated />,
          },
          {
            path: "up-coming",
            element: <Upcoming />,
          },
          {
            path: ":movieId",
            element: <MovieDetail />,
          },
        ],
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "subscribe",
        element: <SubscribePage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
