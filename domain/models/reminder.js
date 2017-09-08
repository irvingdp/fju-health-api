const Model = require('objection').Model;
const timestampUpdateWrapper = require('./wrappers/timestampUpdateWrapper');
const appLabel = require('../../data/appLabels')

class Reminder extends Model {
    static get tableName() {
        return 'Reminder';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: {type: 'integer'},
                key: {type: 'string'},
                isSent: {type: 'boolean'},
                reservation_id_fk: {type: 'references'},
            }
        }
    }

    static get relationMappings() {
        const Reservation = require('./reservation');
        return {
            reservation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Reservation,
                join: {
                    from: `${Reminder.tableName}.reservation_id_fk`,
                    to: `${Reservation.tableName}.id`,
                }
            }
        }
    }

    static get virtualAttributes() {
        return ['title', 'description'];
    }

    get title() {
        return appLabel[this.key] ? appLabel[this.key].title : "";
    }

    get description() {
        return appLabel[this.key] ? appLabel[this.key].description : "";
    }
}

module.exports = timestampUpdateWrapper(Reminder);