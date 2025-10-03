import {Anomaly} from "../domain/model/anomaly.entity.js";

/**
 * Assembler for converting API resources to Anomaly entities.
 * @class
 */

export class AnomalyAssembler {

    static toEntityFromResource(resource) {
        return new Anomaly({...resource});
    }

    static toEntitiesFromResource(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['anomalies'];

        return resources.map(resource => this.toEntityFromResource(resource));
    }
}