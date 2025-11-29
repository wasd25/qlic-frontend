import axios from "axios";

// Base URL from .env (with a fallback for local development)
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const subscriptionService = {
    async getSubscriptions() {
        try {
            console.log("🔄 Fetching subscriptions from:", `${API_URL}/subscriptions`);
            const response = await axios.get(`${API_URL}/subscriptions`);
            console.log("✅ Full response:", response);
            console.log("✅ Response data:", response.data);
            console.log("✅ Data type:", typeof response.data, "Is array:", Array.isArray(response.data));
            return response.data;
        } catch (error) {
            console.error("❌ Error fetching subscriptions:", error);
            console.error("Error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                statusText: error.response?.statusText,
                url: `${API_URL}/subscriptions`
            });

            // Si falla el endpoint plural, intentar con IDs conocidos
            if (error.response?.status === 404 || error.response?.status === 405) {
                console.warn("⚠️ Endpoint /subscriptions not available, trying individual IDs...");
                return await this.getAllSubscriptionsByIds([1, 2, 3]);
            }

            throw error;
        }
    },

    async getAllSubscriptionsByIds(ids) {
        try {
            console.log("🔄 Fetching subscriptions by IDs:", ids);
            const promises = ids.map(id => this.getSubscriptionById(id).catch(err => {
                console.warn(`⚠️ Could not fetch subscription ${id}:`, err.message);
                return null;
            }));
            const results = await Promise.all(promises);
            const subscriptions = results.filter(s => s !== null);
            console.log("✅ Fetched subscriptions:", subscriptions);
            return subscriptions;
        } catch (error) {
            console.error("❌ Error fetching subscriptions by IDs:", error);
            throw error;
        }
    },

    async getSubscriptionById(id) {
        try {
            console.log(`🔄 Fetching subscription by ID: ${id}`);
            const response = await axios.get(`${API_URL}/subscriptions/${id}`);
            console.log("✅ Subscription fetched successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error(`❌ Error fetching subscription ${id}:`, error);
            console.error("Error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },

    async updateSubscription(id, updatedData) {
        try {
            console.log(`🔄 Updating subscription ${id}:`, updatedData);
            const response = await axios.put(`${API_URL}/subscriptions/${id}`, updatedData);
            console.log("✅ Subscription updated successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error(`❌ Error updating subscription ${id}:`, error);
            console.error("Error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },
};
