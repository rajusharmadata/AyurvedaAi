import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth';

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add other auth-related functions here
export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/forgotpassword`, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await axios.put(`${API_URL}/passwordreset/${token}`, { password: newPassword });
        return response.data;
    } catch (error) {
        throw error;
    }
};
