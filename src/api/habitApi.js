// src/api/habitApi.js

import axios from 'axios';

// 🚩 IMPORTANT: Base URL must match your server's running address
const API_URL = 'http://localhost:3000/api/v1/habits';

/**
 * Fetches the 6 newest public habits for the Home Page's Featured Section.
 */
export const fetchFeaturedHabits = async () => {
    try {
        // Calls GET http://localhost:3000/api/v1/habits/featured
        const response = await axios.get(`${API_URL}/featured`);
        // We return the 'data' array from the server's standard response { success: true, data: [...] }
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching featured habits:', error);
        throw error; 
    }
};

// Placeholder for other functions (e.g., fetchPublicHabits, createHabit, etc.)
// ...