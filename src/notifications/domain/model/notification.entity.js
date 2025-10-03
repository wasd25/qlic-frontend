/**
 * Represents a Notification entity.
 * @class
 */
export class Notification {
    constructor({ id = null, title = '', message = '',
                    read = false, created = new Date().toISOString() }) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.created = created;
    }
}