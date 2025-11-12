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

// src/api/habitApi.js

// ... (keep the existing imports and API_URL definition) ...
// import axios from 'axios';
// const API_URL = 'http://localhost:3000/api/v1/habits';

// 👇 NEW: Fetches the user's private habits
export const fetchMyHabits = async (token) => {
    try {
        // Calls GET http://localhost:3000/api/v1/habits/my
        const response = await axios.get(`${API_URL}/my`, {
            headers: {
                Authorization: `Bearer ${token}` // Attach token for verifyToken middleware
            }
        });
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching user habits:', error);
        throw error;
    }
};

/**
 * Creates a new habit (requires authentication token).
 * * 👇 THIS IS THE MISSING FUNCTION
 */
export const createHabit = async (habitData, token) => {
    try {
        // Calls POST http://localhost:3000/api/v1/habits
        const response = await axios.post(API_URL, habitData, {
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating habit:', error);
        throw error;
    }
};

// 👇 NEW: Deletes a habit by ID
export const deleteHabit = async (habitId, token) => {
    try {
        // Calls DELETE http://localhost:3000/api/v1/habits/:id
        const response = await axios.delete(`${API_URL}/${habitId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Attach token
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting habit ${habitId}:`, error);
        throw error;
    }
};

// 👇 NEW: Updates a habit by ID
export const updateHabit = async (habitId, habitData, token) => {
    try {
        // Calls PATCH http://localhost:3000/api/v1/habits/:id
        const response = await axios.patch(`${API_URL}/${habitId}`, habitData, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token
                'Content-Type': 'application/json' // Ensure correct content type
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating habit ${habitId}:`, error);
        throw error;
    }
};

// 👇 NEW: Marks a habit complete for today
export const completeHabit = async (habitId, token) => {
    try {
        // Calls PATCH http://localhost:3000/api/v1/habits/:id/complete
        const response = await axios.patch(`${API_URL}/${habitId}/complete`, null, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error completing habit ${habitId}:`, error);
        throw error;
    }
};

// ... (export other functions) ...