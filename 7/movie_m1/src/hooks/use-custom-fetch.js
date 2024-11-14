import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios-instance.js";

const useCustomFetch = (url) => {
  const fetchData = async () => {
    const response = await axiosInstance.get(url, {
      params: {
        language: "ko-KR",
      },
    });
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [url],   // 객체 형태로 queryKey 전달
    queryFn: fetchData,
    refetchOnWindowFocus: false,  // 포커스 시 자동으로 refetch하지 않도록 설정
    retry: 1,  // 요청 실패 시 재시도 횟수 설정
  });

  return { data, isLoading, isError };
};

export default useCustomFetch;
