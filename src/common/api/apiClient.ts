import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import {
  getRefreshToken,
  getToken,
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from '../utils/auth';
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

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type RefreshResponse = {
  data: {
    access_token: string;
    refresh_token: string;
  };
};

let refreshPromise: Promise<string> | null = null;
let isRedirectingToLogin = false;

const redirectToLogin = () => {
  removeToken();
  removeRefreshToken();
  if (isRedirectingToLogin) return;
  isRedirectingToLogin = true;
  window.location.assign('/login');
};

const refreshAccessToken = (): Promise<string> => {
  if (refreshPromise) return refreshPromise;

  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    redirectToLogin();
    return Promise.reject(new Error('No refresh token available'));
  }

  const refreshUrl = `${BASE_URL}/${VITE_BASE_VERSION}/auth/refresh`;

  refreshPromise = axios
    .post<RefreshResponse>(refreshUrl, {
      refresh_token: refreshToken,
    })
    .then(({ data }) => {
      setToken(data.data.access_token);
      setRefreshToken(data.data.refresh_token);
      return data.data.access_token;
    })
    .catch((error) => {
      redirectToLogin();
      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
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

httpClient.interceptors.response.use(
  (res) => res.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const response = error.response as ApiError | undefined;
    const isUnauthorized = response?.status === 401;
    const isRefreshRequest = originalRequest?.url?.includes('/auth/refresh');

    if (isUnauthorized && originalRequest && !isRefreshRequest) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const accessToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return httpClient(originalRequest);
        } catch {
          return Promise.reject(response ?? error);
        }
      }

      redirectToLogin();
      return Promise.reject(response ?? error);
    }

    if (!isUnauthorized) {
      toast.error(response?.data?.message ?? 'Something went wrong');
    }
    return Promise.reject(response ?? error);
  },
);
