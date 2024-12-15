import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import useGetMovies from "./useGetMovies";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface MoviePage {
  results: Movie[];
}

function useGetInfiniteMovies(category: string) {
  return useInfiniteQuery<MoviePage, Error>({
    queryKey: ["movies", category],
    queryFn: ({ pageParam = 1 }: QueryFunctionContext) => useGetMovies({ category, pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const lastMovie = lastPage.results.at(-1);
      return lastMovie ? allPages.length + 1 : undefined;
    },
  });
}

export default useGetInfiniteMovies;