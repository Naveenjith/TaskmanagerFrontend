import axios from 'axios';

const API_URL_REG = 'http://localhost:8000/api/reg/'; 
const API_URL_LOGIN = 'http://localhost:8000/api/token/';

// Function to handle user registration
export const register = async (userData) => {
    const response = await axios.post(API_URL_REG, userData);
    return response.data;
};

// Function to handle user login
export const login = async (credentials) => {
    const response = await axios.post(API_URL_LOGIN, credentials);
    return response.data;
};

// Function to save tokens
export const saveTokens = (access, refresh) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
};

// Function to get access token from local storage
export const getAccessToken = () => localStorage.getItem('access_token');

// Function to handle user logout
export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};
