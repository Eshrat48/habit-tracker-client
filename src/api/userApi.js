// src/api/userApi.js
import axios from 'axios';
const USER_API_URL = 'http://localhost:3000/api/v1/users'; 
export const saveUserToDB = async (userData) => {
    try {
        const response = await axios.post(`${USER_API_URL}/register-success`, userData);
        return response.data; 
    } catch (error) {
        console.error('Error saving user to DB:', error);
        throw new Error(error.response?.data?.message || 'Failed to save user data to database.');
    }
};