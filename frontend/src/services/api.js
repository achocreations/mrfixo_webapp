import axios from 'axios';
import { errorHandler } from '../utils/errorHandler';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

export const loginUser = async (data) => {
  try {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const registerUser = async (data) => {
  try {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const getServices = async () => {
  try {
    const response = await apiClient.get('/services');
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const createBooking = async (data) => {
  try {
    const response = await apiClient.post('/bookings', data);
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const setAvailability = async (data) => {
  try {
    const response = await apiClient.post('/availability', data);
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const updateAvailability = async (id, data) => {
  try {
    const response = await apiClient.put(`/availability/${id}`, data);
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const getAvailabilityByProvider = async (providerId) => {
  try {
    const response = await apiClient.get(`/availability/${providerId}`);
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const getWallet = async () => {
  try {
    const response = await apiClient.get('/wallet');
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const addFunds = async (data) => {
  try {
    const response = await apiClient.post('/wallet/add-funds', data);
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const makePayment = async (data) => {
  try {
    const response = await apiClient.post('/wallet/make-payment', data);
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const getTransactionHistory = async () => {
  try {
    const response = await apiClient.get('/wallet/transactions');
    return response.data;
  } catch (error) {
    throw errorHandler(error);
  }
};