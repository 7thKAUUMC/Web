import { axiosInstance } from "../../apis/axios-instance";

interface GetMoviesParams {
  category: string;
  pageParam: number;
}

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

const useGetMovies = async ({ category, pageParam }: GetMoviesParams): Promise<MovieResponse> => {
  const { data } = await axiosInstance.get<MovieResponse>(`/movie/${category}?language=ko-KR&page=${pageParam}`);
  return data;
};

export default useGetMovies;