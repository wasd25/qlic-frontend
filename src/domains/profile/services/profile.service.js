import { authService } from '../../iam/services/auth.service.js'
import { UserProfile } from '../model/user-profile.entity.js'

export class ProfileService {
    constructor() {
        this.baseURL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
    }

    getAuthHeaders() {
        const token = authService.getToken ? authService.getToken() : authService.getCurrentUser()?.token;
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }

    // ... (Tu método getCurrentUserProfile sigue igual) ...
    async getCurrentUserProfile() {
        // (El código que ya tenías y funcionaba para el GET)
        const user = authService.getCurrentUser();
        const url = `${this.baseURL}/profiles/${user.id}`;

        const response = await fetch(url, { headers: this.getAuthHeaders() });
        if (!response.ok) throw new Error(`Error ${response.status}`);

        const data = await response.json();
        return UserProfile.fromApiResponse(data);
    }

    // CORRECCIÓN: Método updateProfile
    async updateProfile(profileEntity) {
        const user = authService.getCurrentUser();
        const url = `${this.baseURL}/profiles/${user.id}`;

        // Convertimos a JSON plano
        const payload = profileEntity.toApiPayload();
        console.log('📤 Enviando PUT Corregido:', payload);

        const response = await fetch(url, {
            method: 'PUT',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error Backend (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        return UserProfile.fromApiResponse(data);
    }

    // NUEVO: Método para el Avatar desde Archivo (Cámara/Explorador)
    async updateAvatar(file) {
        console.log("📸 Procesando avatar...", file);

        // 1. Convertimos el archivo a Base64 (Texto)
        const base64Image = await this.convertFileToBase64(file);

        // 2. Obtenemos el perfil actual
        const currentProfile = await this.getCurrentUserProfile();

        // 3. Actualizamos solo el campo avatar
        currentProfile.avatar = base64Image;

        // 4. Enviamos el PUT completo
        return await this.updateProfile(currentProfile);
    }

    // Helper para convertir archivo a texto (Base64)
    convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
}

export const profileService = new ProfileService();