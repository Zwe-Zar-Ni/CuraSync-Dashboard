const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_KEY, token);
};

export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_KEY);
};
