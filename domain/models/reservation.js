const Model = require('objection').Model;
const timestampUpdateWrapper = require('./wrappers/timestampUpdateWrapper');

class Reservation extends Model {
    static get tableName() {
        return 'Reservation';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: {type: 'integer'},
                reserveDate: {type: 'dateTime'},
                status: {
                    type: 'string',
                    enum: ['paymentPending', 'paymentCompleted'],
                },
                paymentDate: {type: 'dateTime'},
                sentPackageDate: {type: 'dateTime'},
                agentCalledDate: {type: 'dateTime'},
                user_id_fk: {type: 'references'},
                package_id_fk: {type: 'references'},
            }
        };
    }

    static get relationMappings() {
        const User = require('./user');
        const Package = require('./package');
        const Reminder = require('./reminder');
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${Reservation.tableName}.user_id_fk`,
                    to: `${User.tableName}.id`,
                }
            },
            package: {
                relation: Model.BelongsToOneRelation,
                modelClass: Package,
                join: {
                    from: `${Reservation.tableName}.package_id_fk`,
                    to: `${Package.tableName}.id`,
                }
            },
            reminder: {
                relation: Model.HasManyRelation,
                modelClass: Reminder,
                join: {
                    from: `${Reminder.tableName}.reservation_id_fk`,
                    to: `${Reservation.tableName}.id`,
                }
            }
        }
    }
}

module.exports = timestampUpdateWrapper(Reservation);