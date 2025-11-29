// javascript
import { authService } from '../../iam/services/auth.service.js'

export class ProfileService {
    constructor() {
        this.baseURL = import.meta.env.VITE_API_BASE_URL
    }

    // Helper para construir headers con Bearer token
    getAuthHeaders(contentType = 'application/json') {
        const token = (authService.getToken && authService.getToken()) || (authService.getCurrentUser && authService.getCurrentUser()?.token);
        if (!token) {
            throw new Error('Usuario no autenticado (token faltante)');
        }
        const headers = { Authorization: `Bearer ${token}` };
        if (contentType) headers['Content-Type'] = contentType;
        return headers;
    }

    /**
     * Obtener perfil del usuario actual
     */
    async getCurrentUserProfile() {
        try {
            const currentUser = authService.getCurrentUser();
            if (!currentUser) {
                throw new Error('Usuario no autenticado');
            }

            console.log('🔄 Getting profile for user ID:', currentUser.id);

            // Obtener perfil del usuario actual (con Bearer token)
            const response = await fetch(`${this.baseURL}/profiles/${currentUser.id}`, {
                headers: this.getAuthHeaders(null)
            });

            if (!response.ok) {
                if (response.status === 404) {
                    // Si no existe perfil, crear uno nuevo
                    console.log('ℹ️ No profile found, CREATING NEW PROFILE');
                    const newProfile = {
                        userId: currentUser.id,
                        name: currentUser.username,
                        email: currentUser.email || '',
                        lastName: '',
                        age: null,
                        phone: '',
                        address: '',
                        avatar: this.generateDefaultAvatar(currentUser.username)
                    };

                    const createResponse = await fetch(`${this.baseURL}/profiles`, {
                        method: 'POST',
                        headers: this.getAuthHeaders('application/json'),
                        body: JSON.stringify(newProfile)
                    });

                    if (!createResponse.ok) {
                        throw new Error(`Error creating profile: ${createResponse.status}`);
                    }

                    const profile = await createResponse.json();
                    console.log('✅ NEW PROFILE CREATED:', profile);
                    return profile;
                }
                throw new Error(`Error getting profile: ${response.status}`);
            }

            const profile = await response.json();
            console.log('✅ Current user profile loaded:', profile);
            return profile;

        } catch (error) {
            console.error('❌ Error getting current user profile:', error);
            throw error;
        }
    }

    /**
     * Actualizar perfil
     */
    async updateProfile(profileData) {
        try {
            const currentUser = authService.getCurrentUser();
            if (!currentUser) {
                throw new Error('Usuario no autenticado');
            }

            console.log('🔄 UPDATE Profile - User ID:', currentUser.id);
            console.log('🔄 UPDATE Profile - Data:', profileData);

            // Usar el ID del usuario actual
            const response = await fetch(`${this.baseURL}/profiles/${currentUser.id}`, {
                method: 'PUT',
                headers: this.getAuthHeaders('application/json'),
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                throw new Error(`Error updating profile: ${response.status}`);
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
     * US33: Actualizar foto de perfil - MÉTODO CORREGIDO
     */
    async updateAvatar(avatarFile) {
        try {
            console.log('🔄 UPDATE AVATAR - Processing file:', avatarFile.name);

            // Para JSON Server simulamos upload y guardamos URL
            const avatarUrl = URL.createObjectURL(avatarFile);

            // Primero obtenemos el perfil actual del usuario
            const currentProfile = await this.getCurrentUserProfile();

            // Actualizamos solo el avatar
            const updatedProfile = {
                ...currentProfile,
                avatar: avatarUrl
            };

            console.log('🔄 UPDATE AVATAR - Updating profile with new avatar');
            return await this.updateProfile(updatedProfile);

        } catch (error) {
            console.error('❌ UPDATE AVATAR - Error:', error);
            throw error;
        }
    }

    /**
     * US34: Cambiar contraseña
     */
    async changePassword(passwordData) {
        try {
            console.log('🔄 CHANGE PASSWORD - Sending:', passwordData);

            const currentUser = authService.getCurrentUser();
            if (!currentUser) {
                throw new Error('Usuario no autenticado');
            }

            // Actualizar la contraseña del usuario usando la API real
            const response = await fetch(`${this.baseURL}/users/${currentUser.id}/password`, {
                method: 'PUT',
                headers: this.getAuthHeaders('application/json'),
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `Error: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ CHANGE PASSWORD - Success');
            return data;

        } catch (error) {
            console.error('❌ CHANGE PASSWORD - Error:', error);
            throw error;
        }
    }

    /**
     * Generar avatar por defecto
     */
    generateDefaultAvatar(username) {
        const initials = username.charAt(0).toUpperCase();
        const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];
        const color = colors[username.length % colors.length];

        return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><rect width="150" height="150" fill="${color}" rx="75"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="60" font-family="Arial, sans-serif">${initials}</text></svg>`;
    }
}

// Instancia única del servicio
export const profileService = new ProfileService();
