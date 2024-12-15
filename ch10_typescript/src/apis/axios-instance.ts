import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MOVIE_API_URL as string,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY as string}`,
  },
});

export { axiosInstance };