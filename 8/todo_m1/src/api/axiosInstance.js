import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // .env 파일에 API URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
