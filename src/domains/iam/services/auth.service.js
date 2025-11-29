export class AuthService {
    constructor() {
        this.baseURL = import.meta.env.VITE_API_BASE_URL
        this.currentUser = null;
    }

    async login(credentials) {
        try {
            console.log('🔄 AUTH - Login attempt:', { username: credentials.username });

            // POST a /authentication/sign-in con username y password
            const response = await fetch(`${this.baseURL}/authentication/sign-in`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error en login');
            }

            const data = await response.json();
            // data = { id: 1, username: "queso", token: "eyJhb..." }

            const userWithToken = {
                id: data.id,
                username: data.username,
                token: data.token
            };

            localStorage.setItem('currentUser', JSON.stringify(userWithToken));
            this.currentUser = userWithToken;

            console.log('✅ AUTH - Login success, token:', userWithToken.token.substring(0, 20) + '...');
            return userWithToken;

        } catch (error) {
            console.error('❌ AUTH - Login error:', error);
            throw error;
        }
    }

    async register(userData) {
        try {
            console.log('🔄 AUTH - Register attempt:', userData.username);

            // POST a /authentication/sign-up
            const response = await fetch(`${this.baseURL}/authentication/sign-up`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: userData.username,
                    password: userData.password
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error en registro');
            }

            const createdUser = await response.json();
            console.log('✅ AUTH - Register success:', createdUser.username);
            return createdUser;

        } catch (error) {
            console.error('❌ AUTH - Register error:', error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        console.log('✅ AUTH - Logout success');
    }

    getCurrentUser() {
        if (this.currentUser) return this.currentUser;
        const stored = localStorage.getItem('currentUser');
        if (stored) {
            this.currentUser = JSON.parse(stored);
            return this.currentUser;
        }
        return null;
    }

    getToken() {
        return this.getCurrentUser()?.token || null;
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}

export const authService = new AuthService();
