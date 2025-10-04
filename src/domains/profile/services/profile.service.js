export class ProfileService {
    constructor() {
        this.baseURL = 'http://localhost:3000';
    }

    /**
     * US31: Obtener el perfil del usuario
     * @returns {Promise<Object>}
     */
    async getProfile() {
        try {
            const response = await fetch(`${this.baseURL}/profile`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    }

    /**
     * US32: Actualizar información básica del perfil
     * @param {Object} profileData - Datos del perfil a actualizar
     * @returns {Promise<Object>}
     */
    async updateProfile(profileData) {
        try {
            const response = await fetch(`${this.baseURL}/profile/1`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }

    /**
     * US33: Actualizar foto de perfil
     * @param {File} avatarFile - Archivo de imagen
     * @returns {Promise<Object>}
     */
    async updateAvatar(avatarFile) {
        try {
            // Para JSON Server simulamos upload y guardamos URL
            const avatarUrl = URL.createObjectURL(avatarFile);

            // Primero obtenemos el perfil actual
            const currentProfile = await this.getProfile();

            // Actualizamos solo el avatar
            const updatedProfile = {
                ...currentProfile,
                avatar: avatarUrl
            };

            return await this.updateProfile(updatedProfile);
        } catch (error) {
            console.error('Error updating avatar:', error);
            throw error;
        }
    }

    /**
     * US34: Cambiar contraseña
     * @param {Object} passwordData - { currentPassword, newPassword }
     * @returns {Promise<Object>}
     */
    async changePassword(passwordData) {
        try {
            // En un backend real, esto iría a un endpoint específico
            const response = await fetch(`${this.baseURL}/profile/1/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(passwordData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    }
}

// Instancia única del servicio (Singleton)
export const profileService = new ProfileService();