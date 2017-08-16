const Model = require('objection').Model;
const timestampUpdateWrapper = require('./wrappers/timestampUpdateWrapper');

class Reminder extends Model {
    static get tableName() {
        return 'Reminder';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: {type: 'integer'},
                notifyDate: {type: 'dateTime'},
                title: {type: 'string'},
                description: {type: 'string'},
                isSent: {type: 'boolean'},
                reservation_id_fk: {type: 'references'},
            }
        };
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
}

module.exports = timestampUpdateWrapper(Reminder);