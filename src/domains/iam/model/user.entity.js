export class User {
    constructor({ id, username, email, password, isActive, createdAt, lastLogin }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isActive = isActive !== false;
        this.createdAt = createdAt || new Date().toISOString();
        this.lastLogin = lastLogin;
    }

    validate() {
        const errors = [];

        if (!this.username?.trim()) errors.push('Username es requerido');
        if (!this.email?.trim()) errors.push('Email es requerido');
        if (!this.password) errors.push('Password es requerido');
        if (this.password && this.password.length < 8) errors.push('Password debe tener al menos 8 caracteres');

        return errors;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            isActive: this.isActive,
            createdAt: this.createdAt,
            lastLogin: this.lastLogin
        };
    }
}