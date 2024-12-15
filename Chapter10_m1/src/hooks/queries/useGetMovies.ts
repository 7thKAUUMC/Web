import { axiosInstance } from "../../apis/axios-instance";

interface GetMoviesParams {
  category: string;
  pageParam?: number;
}

const useGetMovies = async ({ category, pageParam }: GetMoviesParams) => {
  const { data } = await axiosInstance.get(
    `/movie/${category}?language=ko-KR&page=${pageParam}`
  );
  return data;
};

export default useGetMovies;
