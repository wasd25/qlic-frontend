export class AuthService {
    constructor() {
        this.baseURL = import.meta.env.VITE_API_BASE_URL
        this.currentUser = null;
    }


    async login(credentials) {
        try {
            console.log('🔄 AUTH - Login attempt:', { username: credentials.username });

            // Obtener TODOS los usuarios y buscar manualmente
            const response = await fetch(`${this.baseURL}/users`);
            const users = await response.json();

            console.log('📋 AUTH - All users:', users);

            // Buscar usuario por username o email
            const user = users.find(u =>
                u.username === credentials.username ||
                u.email === credentials.username
            );

            console.log('🔍 AUTH - Found user:', user);

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            // VERIFICAR CONTRASEÑA ACTUALIZADA
            if (user.password !== credentials.password) {
                throw new Error('Contraseña incorrecta');
            }

            if (!user.isActive) {
                throw new Error('Usuario inactivo');
            }

            // Actualizar lastLogin
            const updatedUser = {
                ...user,
                lastLogin: new Date().toISOString()
            };

            await fetch(`${this.baseURL}/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser)
            });

            // Guardar usuario en localStorage
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            this.currentUser = updatedUser;

            console.log('✅ AUTH - Login success:', updatedUser.username);
            return updatedUser;

        } catch (error) {
            console.error('❌ AUTH - Login error:', error);
            throw error;
        }
    }

    /**
     * Logout - LIMPIAR TODO EL CACHE
     */
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        console.log('✅ AUTH - Logout success - ALL CACHE CLEARED');

        // Forzar recarga de la página para limpiar cualquier caché de Vue
    }

    /**
     * Obtener usuario actual
     */
    getCurrentUser() {
        if (this.currentUser) return this.currentUser;

        const stored = localStorage.getItem('currentUser');
        if (stored) {
            this.currentUser = JSON.parse(stored);
            return this.currentUser;
        }
        return null;
    }

    /**
     * Verificar si está autenticado
     */
    isAuthenticated() {
        return !!this.getCurrentUser();
    }

    /**
     * Registrar nuevo usuario - VERSIÓN CORREGIDA
     */
    async register(userData) {
        try {
            console.log('🔄 AUTH - Register attempt:', userData.username);

            // Obtener todos los usuarios para verificar duplicados
            const response = await fetch(`${this.baseURL}/users`);
            const existingUsers = await response.json();

            // Verificar si usuario ya existe
            const userExists = existingUsers.find(u =>
                u.username === userData.username ||
                u.email === userData.email
            );

            if (userExists) {
                throw new Error('Usuario o email ya existen');
            }

            // Crear nuevo usuario
            const newUser = {
                ...userData,
                id: Date.now(), // ID temporal
                isActive: true,
                createdAt: new Date().toISOString()
            };

            const createResponse = await fetch(`${this.baseURL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });

            const createdUser = await createResponse.json();
            console.log('✅ AUTH - Register success:', createdUser.username);
            return createdUser;

        } catch (error) {
            console.error('❌ AUTH - Register error:', error);
            throw error;
        }
    }
}

export const authService = new AuthService();