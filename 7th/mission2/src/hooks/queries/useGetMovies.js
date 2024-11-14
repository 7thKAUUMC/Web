import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance";

const useGetMovies = async ({ category, pageParam }) => {
  const { data } = await axiosInstance.get(
    `/movie/${category}?language=ko-KR&page=${pageParam}`
  );

  console.log("영화 받아오는 중..");

  return data;
};

export default useGetMovies;

// const useGetMovies = (url, queryKey) => {
//   const fetchData = async () => {
//     const response = await axiosInstance.get(url);
//     return response.data;
//   };

//   const { data, isLoading, isError } = useQuery({
//     queryKey: [queryKey, url],
//     queryFn: fetchData,
//   });

//   return { data, isLoading, isError };
// };
