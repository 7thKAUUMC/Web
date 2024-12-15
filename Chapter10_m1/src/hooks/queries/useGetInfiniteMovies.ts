import { useInfiniteQuery } from "@tanstack/react-query";
import useGetMovies from "./useGetMovies";

function useGetInfiniteMovies(category: string) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }: { pageParam?: number }) =>
      useGetMovies({ category, pageParam }),
    queryKey: ["movies", category],
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages: any[]) => {
      const lastMovie = lastPage.results.at(-1);

      return lastMovie ? allPages.length + 1 : undefined;
    },
  });
}

export default useGetInfiniteMovies;
