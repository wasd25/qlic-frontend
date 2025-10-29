import { authService } from '../../iam/services/auth.service.js'

export class ProfileService {
    constructor() {
        this.baseURL = 'http://localhost:3000';
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

            // Obtener TODOS los perfiles y buscar el correcto
            const response = await fetch(`${this.baseURL}/profile`);
            const allProfiles = await response.json();

            console.log('📋 All profiles:', allProfiles);

            // Buscar perfil por userId O por id (para compatibilidad)
            let profile = allProfiles.find(p =>
                p.userId === currentUser.id || p.id === currentUser.id
            );

            console.log('🔍 Found profile:', profile);

            // Si no existe perfil, crear uno nuevo
            if (!profile) {
                console.log('ℹ️ No profile found, CREATING NEW PROFILE');
                const newProfile = {
                    id: currentUser.id,
                    userId: currentUser.id,
                    name: currentUser.username,
                    email: currentUser.email,
                    lastName: '',
                    age: null,
                    phone: '',
                    address: '',
                    avatar: this.generateDefaultAvatar(currentUser.username)
                };

                const createResponse = await fetch(`${this.baseURL}/profile`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newProfile)
                });

                profile = await createResponse.json();
                console.log('✅ NEW PROFILE CREATED:', profile);
            }

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

            // Usar el ID del perfil encontrado, no hardcodeado
            const currentProfile = await this.getCurrentUserProfile();
            const profileId = currentProfile.id;

            const response = await fetch(`${this.baseURL}/profile/${profileId}`, {
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

            // Primero obtenemos el perfil actual para verificar la contraseña actual
            const currentProfile = await this.getCurrentUserProfile();
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