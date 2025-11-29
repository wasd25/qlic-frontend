export class UserProfile {
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
     * Adaptador: De JSON Backend -> Entidad Frontend
     */
    static fromApiResponse(json) {
        // FUNCIÓN DE LIMPIEZA:
        // Si el valor es nulo, undefined, vacío o es un guion "-", devolvemos null
        const clean = (val) => {
            if (!val) return null;
            const str = String(val).trim();
            if (str === '-' || str === 'string') return null;
            return str;
        };

        // 1. Obtenemos las partes limpias
        const street = clean(json.street); // Aquí es donde probablemente está toda la dirección ahora
        const number = clean(json.number);
        const city = clean(json.city);
        const country = clean(json.country);

        // 2. Lógica inteligente para mostrar la dirección:
        // Si 'street' ya parece contener comas (porque ahí guardamos todo antes),
        // confiamos en 'street' y no le pegamos el resto para evitar duplicados.
        let fullAddress = '';

        if (street && street.includes(',')) {
            // Asumimos que street ya tiene toda la dirección completa
            fullAddress = street;
        } else {
            // Si no, intentamos unir las partes válidas
            // Filtramos los nulos y unimos con comas
            fullAddress = [street, number, city, country]
                .filter(part => part !== null && part !== '')
                .join(', ');
        }

        // Limpieza final por si quedaron comas raras
        fullAddress = fullAddress.replace(/, ,/g, ',').replace(/,\s*-/g, '').trim();

        // Fallback final
        if (!fullAddress && json.address) fullAddress = json.address;

        return new UserProfile({
            id: json.id,
            name: json.firstName || json.name || '',
            lastName: json.lastName || '',
            email: json.email || '',
            age: json.age || 0,
            phone: json.phone || '',
            address: fullAddress,
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
        // Limpiamos la dirección actual de guiones repetidos antes de enviar
        const cleanAddress = this.address ? this.address.replace(/-,\s*-\s*,?\s*-?/g, '').trim() : '';

        return {
            firstName: this.name,
            lastName: this.lastName,
            email: this.email,
            age: parseInt(this.age) || 0,
            phone: this.phone,
            avatarUrl: this.avatar,

            // Enviamos la dirección limpia al campo street
            street: cleanAddress || '-',

            // Los demás campos se van como guiones para satisfacer al backend
            // pero como nuestro 'fromApiResponse' ahora ignora los guiones,
            // ya no se mostrarán en la pantalla.
            number: '-',
            city: '-',
            postalCode: '-',
            country: '-'
        };
    }
}