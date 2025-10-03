import axios from "axios";
import { AnomalyAssembler } from "src/anomaly-detection/infrastructure/anomaly.assembler.js"

const API_URL = "http://localhost:3000/anomalies";

export class AnomalyStore {
    constructor() {
        this.anomalies = [];
    }

    /**
     * Load all anomalies from the API
     * @returns {Promise<Anomaly[]>}
     */
    async fetchAll() {
        try {
            const response = await axios.get(API_URL);
            this.anomalies = AnomalyAssembler.toEntitiesFromResource(response);
            return this.anomalies;
        } catch (error) {
            console.error("Error fetching anomalies:", error);
            return [];
        }
    }

    /**
     * Find one anomaly by ID
     * @param {number} id
     * @returns {Promise<Anomaly|null>}
     */
    async fetchById(id) {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return AnomalyAssembler.toEntityFromResource(response.data);
        } catch (error) {
            console.error(`Error fetching anomaly with id ${id}:`, error);
            return null;
        }
    }

    /**
     * Add a new anomaly
     * @param {Anomaly} anomaly
     * @returns {Promise<Anomaly|null>}
     */
    async add(anomaly) {
        try {
            const response = await axios.post(API_URL, anomaly);
            const newAnomaly = AnomalyAssembler.toEntityFromResource(response.data);
            this.anomalies.push(newAnomaly);
            return newAnomaly;
        } catch (error) {
            console.error("Error adding anomaly:", error);
            return null;
        }
    }

    /**
     * Mark anomaly as resolved
     * @param {number} id
     * @returns {Promise<Anomaly|null>}
     */
    async resolve(id) {
        try {
            const anomaly = await this.fetchById(id);
            if (!anomaly) return null;

            const updated = { ...anomaly, resolved: true };
            const response = await axios.patch(`${API_URL}/${id}`, { resolved: true });
            const resolvedAnomaly = AnomalyAssembler.toEntityFromResource(response.data);

            this.anomalies = this.anomalies.map(a => a.id === id ? resolvedAnomaly : a);
            return resolvedAnomaly;
        } catch (error) {
            console.error(`Error resolving anomaly with id ${id}:`, error);
            return null;
        }
    }

    /**
     * Delete an anomaly
     * @param {number} id
     * @returns {Promise<boolean>}
     */
    async delete(id) {
        try {
            await axios.delete(`${API_URL}/${id}`);
            this.anomalies = this.anomalies.filter(a => a.id !== id);
            return true;
        } catch (error) {
            console.error(`Error deleting anomaly with id ${id}:`, error);
            return false;
        }
    }

    /**
     * Get all anomalies in memory (already fetched)
     * @returns {Anomaly[]}
     */
    getAllLocal() {
        return this.anomalies;
    }
}
