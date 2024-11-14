import { useQuery } from "react-query"; // react-query에서 useQuery 가져오기
import axios from "axios";

const fetchData = async (url, options) => {
  const response = await axios.request({ ...options, url });
  return response.data.results || response.data; // 수정된 부분
};

const useFetch = (key, url, options) => {
  return useQuery(key, () => fetchData(url, options), {
    staleTime: 60000, // 데이터가 신선하다고 간주되는 시간 (1분)
    ...options.queryOptions, // 추가적인 쿼리 옵션
  });
};

export default useFetch;