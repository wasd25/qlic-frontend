import axios from "axios";

// Base URL from .env (with a fallback for local development)
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const subscriptionService = {
    async getSubscriptions() {
        try {
            const response = await axios.get(`${API_URL}/subscriptions`);
            console.log(" Subscriptions fetched:", response.data);
            return response.data;
        } catch (error) {
            console.error(" Error fetching subscriptions:", error);
            throw error;
        }
    },

    async updateSubscription(id, updatedData) {
        try {
            const response = await axios.put(`${API_URL}/subscriptions/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error(" Error updating subscription:", error);
            throw error;
        }
    },
};
