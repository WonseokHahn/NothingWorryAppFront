import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰을 자동으로 추가하는 인터셉터
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 인증 API
export const authAPI = {
  signup: (username, email, password) =>
    api.post('/auth/signup', { username, email, password }),
  login: (username, password) =>
    api.post('/auth/login', { username, password }),
  me: (token) =>
    api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
};

// 감정 API
export const emotionTrashAPI = {
  send: (content) => api.post('/emotion-trash', { content }),
};

export const nothingHappenedAPI = {
  send: (content) => api.post('/nothing-happened', { content }),
};

export const fortuneAPI = {
  get: () => api.get('/fortune'),
};

export const procrastinationAPI = {
  send: (content) => api.post('/procrastination', { content }),
};

export const historyAPI = {
  get: (limit = 50, offset = 0) => api.get('/history', { params: { limit, offset } }),
  delete: (id) => api.delete(`/emotion/${id}`),
};

export default api;
