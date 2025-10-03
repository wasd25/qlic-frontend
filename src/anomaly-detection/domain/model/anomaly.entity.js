/**
 * Represents a Anomaly Detection entity.
 * @class
 */

export class Anomaly {
    constructor({ id = null, profile_id = null,
                type = '', detected_anomaly = new Date().toISOString(),
                resolved = false}) {
        this.id = id;
        this.profile_id = profile_id;
        this.type = type;
        this.detected_anomaly = detected_anomaly;
        this.resolved = resolved;
    }
}