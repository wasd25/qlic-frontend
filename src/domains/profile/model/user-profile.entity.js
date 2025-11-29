export class UserProfile {
    // CAMBIO CLAVE: Ahora el constructor espera un solo objeto con propiedades
    constructor({ id, name, lastName, email, age, phone, address, avatar, rawAddressData = {} } = {}) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.phone = phone;
        this.address = address;
        this.avatar = avatar;
        this._rawAddress = rawAddressData;
    }

    get fullName() {
        return `${this.name} ${this.lastName}`.trim();
    }

    /**
     * Adaptador: De JSON Backend (Swagger) -> Entidad Frontend
     */
    static fromApiResponse(json) {
        const fullAddress = json.street
            ? `${json.street} ${json.number || ''}, ${json.city || ''}, ${json.country || ''}`
            : (json.address || '');

        // Pasamos un objeto al constructor
        return new UserProfile({
            id: json.id,
            name: json.firstName || json.name || '',
            lastName: json.lastName || '',
            email: json.email || '',
            age: json.age || 0,
            phone: json.phone || '',
            address: fullAddress.replace(/, ,/g, '').trim(),
            avatar: json.avatarUrl || json.avatar || '',
            rawAddressData: {
                street: json.street,
                number: json.number,
                city: json.city,
                postalCode: json.postalCode,
                country: json.country
            }
        });
    }

    /**
     * Adaptador: De Entidad Frontend -> JSON Backend (PUT)
     */
    toApiPayload() {
        return {
            firstName: this.name,
            lastName: this.lastName,
            email: this.email,
            age: parseInt(this.age) || 0,
            phone: this.phone,
            avatarUrl: this.avatar,

            // Si la dirección es nueva, la mandamos toda a street
            street: this.address || this._rawAddress.street || '-',
            number: this._rawAddress.number || '-',
            city: this._rawAddress.city || '-',
            postalCode: this._rawAddress.postalCode || '-',
            country: this._rawAddress.country || '-'
        };
    }
}