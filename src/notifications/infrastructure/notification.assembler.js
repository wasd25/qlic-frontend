import {Notification} from "../domain/model/notification.entity.js";

/**
 * Assembler fot converting API resources to Notification entities.
 * @class
 */
export class NotificationAssembler {
    static toEntityFromResource(resource) {
        return new Notification({...resource});
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}: ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : ['notifications'];
    }
}