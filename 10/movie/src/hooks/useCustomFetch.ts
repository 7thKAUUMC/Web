import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../apis/axios-instance';

export const useCustomFetch = (url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: async () => {
      const response = await axiosInstance.get(url);
      return response;
    }
  });
}; 