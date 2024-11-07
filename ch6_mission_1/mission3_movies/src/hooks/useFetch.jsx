import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching data from:", url); // URL 확인
        console.log("With options:", options); // 옵션 확인

        const response = await axios.request({ ...options, url });
        
        console.log(response.data); // API 응답 로그
        setData(response.data.results || response.data); // 수정된 부분
      } catch (err) {
        console.error(err); // 에러 로그
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};

export default useFetch;
