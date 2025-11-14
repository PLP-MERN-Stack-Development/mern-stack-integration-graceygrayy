// useApi.js - Custom hook for API calls with loading and error handling

import { useState, useCallback } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api({
        method,
        url,
        data,
      });

      setLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  }, []);

  const get = useCallback((url) => request('GET', url), [request]);
  const post = useCallback((url, data) => request('POST', url, data), [request]);
  const put = useCallback((url, data) => request('PUT', url, data), [request]);
  const delete_ = useCallback((url) => request('DELETE', url), [request]);

  return { get, post, put, delete_, loading, error };
};

export default api;
