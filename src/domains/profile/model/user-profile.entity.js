export class UserProfile {
    constructor({ id, name, lastName, email, age, phone, address, avatar }) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.phone = phone;
        this.address = address;
        this.avatar = avatar;
    }

    get fullName() {
        return `${this.name} ${this.lastName}`;
    }

    validate() {
        const errors = [];

        if (!this.name) errors.push('Nombre es requerido');
        if (!this.lastName) errors.push('Apellido es requerido');
        if (!this.email) errors.push('Email es requerido');
        if (this.age && this.age < 0) errors.push('Edad no puede ser negativa');

        return errors;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            age: this.age,
            phone: this.phone,
            address: this.address,
            avatar: this.avatar
        };
    }
}