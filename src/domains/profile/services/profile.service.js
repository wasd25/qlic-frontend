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
            console.log('🔄 GET Profile - Fetching from:', `${this.baseURL}/profile`);
            const response = await fetch(`${this.baseURL}/profile`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ GET Profile - Raw data:', data);

            // JSON Server devuelve un array, tomamos el primer elemento
            if (Array.isArray(data)) {
                return data[0]; // Retorna el primer perfil del array
            }

            return data;
        } catch (error) {
            console.error('❌ GET Profile - Error:', error);
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
            console.log('🔄 UPDATE Profile - Sending to:', `${this.baseURL}/profile/1`, profileData);
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

            const data = await response.json();
            console.log('✅ UPDATE Profile - Success:', data);
            return data;
        } catch (error) {
            console.error('❌ UPDATE Profile - Error:', error);
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
            console.log('🔄 CHANGE PASSWORD - Sending:', passwordData);

            // Primero obtenemos el perfil actual para verificar la contraseña actual
            const currentProfile = await this.getProfile();
            console.log('🔄 CHANGE PASSWORD - Current profile:', currentProfile);

            // Verificar que la contraseña actual sea correcta
            if (currentProfile.password !== passwordData.currentPassword) {
                console.log('❌ CHANGE PASSWORD - Password mismatch:', {
                    stored: currentProfile.password,
                    provided: passwordData.currentPassword
                });
                throw new Error('La contraseña actual es incorrecta');
            }

            // Actualizar la contraseña
            const updatedProfile = {
                ...currentProfile,
                password: passwordData.newPassword
            };

            // Guardar en JSON Server
            const response = await fetch(`${this.baseURL}/profile/1`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProfile)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ CHANGE PASSWORD - Success');
            return data;
        } catch (error) {
            console.error('❌ CHANGE PASSWORD - Error:', error);
            throw error;
        }
    }
}

// Instancia única del servicio (Singleton)
export const profileService = new ProfileService();