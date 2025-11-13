// src/api/habitApi.js
import axios from 'axios';
const API_URL = 'http://localhost:3000/api/v1/habits';

/**
 * @desc Fetches the 6 newest public habits for the Home Page's Featured Section.
 * @route GET /api/v1/habits/featured
 * @access Public
 */
export const fetchFeaturedHabits = async () => {
    try {
        const response = await axios.get(`${API_URL}/featured`);
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching featured habits:', error);
        throw error; 
    }
};

/**
 * @desc Fetches all public habits (for Browse Public Habits page).
 * @route GET /api/v1/habits/public
 * @access Public
 */
export const fetchPublicHabits = async () => {
    try {
        const response = await axios.get(`${API_URL}/public`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching public habits:', error);
        throw error;
    }
};

/**
 * @desc Fetches the user's private habits.
 * @route GET /api/v1/habits/my
 * @access Private (Requires token)
 */
export const fetchMyHabits = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/my`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching user habits:', error);
        throw error;
    }
};

/**
 * @desc Fetches the details for a single habit by ID.
 * @route GET /api/v1/habits/:id
 * @access Private (Requires token)
 */
export const fetchHabitDetail = async (habitId, token) => {
    try {
        const response = await axios.get(`${API_URL}/${habitId}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        // Returns single habit object
        return response.data.data; 
    } catch (error) {
        console.error(`Error fetching habit ${habitId}:`, error);
        throw error;
    }
};

/**
 * @desc Creates a new habit.
 * @route POST /api/v1/habits
 * @access Private (Requires token)
 */
export const createHabit = async (habitData, token) => {
    try {
        console.log('CreateHabit - Sending data:', habitData);
        console.log('CreateHabit - Token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
        const response = await axios.post(API_URL, habitData, {
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        console.log('CreateHabit - Success response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating habit:', error);
        console.error('Error status:', error?.response?.status);
        console.error('Error data:', error?.response?.data);
        throw error;
    }
};

/**
 * @desc Deletes a habit by ID.
 * @route DELETE /api/v1/habits/:id
 * @access Private (Requires token)
 */
export const deleteHabit = async (habitId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${habitId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting habit ${habitId}:`, error);
        throw error;
    }
};

/**
 * @desc Updates a habit by ID.
 * @route PATCH /api/v1/habits/:id
 * @access Private (Requires token)
 */
export const updateHabit = async (habitId, habitData, token) => {
    try {
        const response = await axios.patch(`${API_URL}/${habitId}`, habitData, {
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating habit ${habitId}:`, error);
        throw error;
    }
};

/**
 * @desc Marks a habit complete for today.
 * @route PATCH /api/v1/habits/:id/complete
 * @access Private (Requires token)
 */
export const completeHabit = async (habitId, token) => {
    try {
        const response = await axios.patch(`${API_URL}/${habitId}/complete`, {}, { 
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error completing habit ${habitId}:`, error);
        throw error;
    }
};