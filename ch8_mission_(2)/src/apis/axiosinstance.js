import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',  // 또는 실제 API 서버 주소
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;  // default export 추가