import axios from "axios";

const API_URL = "http://localhost:3000/subscriptions"; //change to .env when hosting.

export const subscriptionService = {
    async getSubscriptions() {
        try {
            const response = await axios.get(API_URL);
            console.log("Subscriptions fetched:", response.data); // Depuración
            return response.data;
        } catch (error) {
            console.error("Error fetching subscriptions: ", error);
            throw error;
        }
    },

    async updateSubscription(id, updatedData) {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error("Error updating subscription: ", error);
            throw error;
        }
    },
};