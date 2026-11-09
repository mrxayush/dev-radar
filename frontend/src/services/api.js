import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8080/api'
    : '/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('devradar_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle auth failures gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('devradar_token');
        localStorage.removeItem('devradar_user');
        localStorage.removeItem('devradar_role');
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('devradar_token', response.data.token);
      localStorage.setItem('devradar_user', response.data.username);
      localStorage.setItem('devradar_role', response.data.role);
    }
    return response.data;
  },

  register: async (username, password, role) => {
    const response = await api.post('/auth/register', { username, password, role });
    if (response.data.token) {
      localStorage.setItem('devradar_token', response.data.token);
      localStorage.setItem('devradar_user', response.data.username);
      localStorage.setItem('devradar_role', response.data.role);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('devradar_token');
    localStorage.removeItem('devradar_user');
    localStorage.removeItem('devradar_role');
  },

  getCurrentUser: () => localStorage.getItem('devradar_user'),
  getRole: () => localStorage.getItem('devradar_role'),
  isRecruiter: () => localStorage.getItem('devradar_role') === 'ROLE_RECRUITER',
  isAuthenticated: () => !!localStorage.getItem('devradar_token'),
};

export const scoutService = {
  scoutUser: async (username) => {
    const response = await api.get(`/scout/${encodeURIComponent(username.trim())}`);
    return response.data;
  },
};

export const bookmarkService = {
  getBookmarks: async () => {
    const response = await api.get('/bookmarks');
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/bookmarks/stats');
    return response.data;
  },

  bookmarkCandidate: async (data) => {
    const response = await api.post('/bookmarks', data);
    return response.data;
  },

  updateBookmark: async (id, data) => {
    const response = await api.put(`/bookmarks/${id}`, data);
    return response.data;
  },

  deleteBookmark: async (id) => {
    const response = await api.delete(`/bookmarks/${id}`);
    return response.data;
  },
};

export default api;
