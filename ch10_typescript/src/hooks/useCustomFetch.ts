import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axios-instance";

interface FetchResult<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
}

const useCustomFetch = <T = unknown>(url: string | null): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 지연 추가
        const response = await axiosInstance.get<T>(url, {
          params: {
            language: "ko-KR",
          },
        });
        setData(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, isError };
};

export default useCustomFetch;