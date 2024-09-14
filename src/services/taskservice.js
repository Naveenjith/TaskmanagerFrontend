import axios from 'axios';

const API_URL = 'http://localhost:8000/api/tasks/'; // Adjust based on your API URL

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
});

export const getTasks = async () => {
    const response = await axios.get(API_URL, getHeaders());
    return response.data;
};

export const getTask = async (id) => {
    const response = await axios.get(`${API_URL}${id}/`, getHeaders());
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData, getHeaders());
    return response.data;
};

export const updateTask = async (id, taskData) => {
    const response = await axios.put(`${API_URL}${id}/`, taskData, getHeaders());
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await axios.delete(`${API_URL}${id}/`, getHeaders());
    return response.data;
};
