//import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import jwtDecode from 'jwt-decode';

// Constants
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000'; // Replace with your actual API base URL
const TOKEN_KEY = 'authToken';

// Axios Instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to Attach Token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Alert.alert('Session Expired', 'Please log in again.');
      removeToken(); // Remove token on unauthorized error
    }
    return Promise.reject(error);
  }
);

// Store JWT Token
export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to save token', error);
  }
};

// Retrieve JWT Token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to get token', error);
    return null;
  }
};

// Remove JWT Token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to remove token', error);
  }
};

// Decode JWT Token
export const decodeToken = async () => {
  try {
    const token = await getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};

// Check if the Token is Valid
export const isTokenValid = async () => {
  const decodedToken = await decodeToken();
  if (!decodedToken) return false;

  const currentTime = Date.now() / 1000; // Current time in seconds
  return decodedToken.exp > currentTime; // Check if token is expired
};

// Login Function
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    const { token } = response.data;
    await setToken(token);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

// Logout Function
export const logout = async () => {
  await removeToken();
};

// API Client for Making Authenticated Requests
export const authApiClient = apiClient;
