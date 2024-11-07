import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.code === 'ERR_NETWORK') {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    
    if (error.response) {
      const message = error.response.data.message || '회원가입에 실패했습니다.';
      throw new Error(message);
    }
    
    throw new Error('예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    
    if (error.response) {
      const message = error.response.data.message || '로그인에 실패했습니다.';
      throw new Error(message);
    }
    
    throw new Error('예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

export const getUserInfo = async (accessToken) => {
  try {
    const response = await api.get('/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      throw new Error('서버에 연결할 수 없습니다.');
    }
    
    if (error.response) {
      const message = error.response.data.message || '사용자 정보를 가져오는데 실패했습니다.';
      throw new Error(message);
    }
    
    throw new Error('예기치 않은 오류가 발생했습니다.');
  }
};

export default api;