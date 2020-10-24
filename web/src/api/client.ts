// import { logout } from './auth';
import { authTokenKey } from '../utils/constants';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
  },
};

export const openClient = axios.create(config);

export const client = axios.create(config);

client.interceptors.request.use(request => {
  const authToken = window.localStorage.getItem(authTokenKey);
  if (authToken) {
    request.headers.Authorization = authToken;
  }
  return request;
});

client.interceptors.response.use(
  response => {
    return response;
  },
  function (error: AxiosError) {
    console.error('HTTP Error', error);
    if (error.response?.status === 401) {
      console.log('we should be logging out');
      // logout();
    }
  }
);
