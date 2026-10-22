import axios from 'axios';
import { getToken } from '../utils/auth';
import type { ApiError } from '../types';
import { toast } from 'sonner';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const VITE_BASE_VERSION = import.meta.env.VITE_BASE_VERSION;

const BASE_CONFIG = {
  baseURL: BASE_URL + '/' + VITE_BASE_VERSION,
  headers: {
    'Content-Type': 'application/json',
  },
};

const handleError = (error: { response: ApiError }) => {
  toast.error(error.response?.data?.message ?? 'Something went wrong');
  return Promise.reject(error.response);
};

export const httpClient = axios.create(BASE_CONFIG);

httpClient.interceptors.request.use(
  (config) => {
    try {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Failed to get access token', error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use((res) => res.data, handleError);
