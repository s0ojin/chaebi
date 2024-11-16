import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

export const publicApi = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const publicFormApi = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const privateApi = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMTAyNjY1NjkwOCIsImlhdCI6MTczMTc2NzgyOCwiZXhwIjoxNzMyMDI3MDI4fQ.7MQuUJgeqvstobufC6-UpO80x11YxCfhOnrDWctKvDtFqs7vj4zuK4JgaZ2qlnywa08tMRY6ifD_V4BREuu7aw`,
  },
});

privateApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const privateFormApi = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

privateFormApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('accessToken');
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// for debugging
publicApi.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

// for debugging
publicApi.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});
