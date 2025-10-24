import { authService } from '../../iam/services/auth.service.js'

export class ProfileService {
    constructor() {
        this.baseURL = 'http://localhost:3000';
    }

    /**
     * Obtener perfil del usuario actual - VERSIÓN CORREGIDA
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
                    avatar: generateDefaultAvatar(currentUser.username) // ← Nueva función
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
     * Actualizar perfil - VERSIÓN CORREGIDA
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
     * Obtener perfil específico (para compatibilidad)
     */
    async getProfile() {
        // Redirigir al método actual
        return await this.getCurrentUserProfile();
    }

}

export const profileService = new ProfileService();
