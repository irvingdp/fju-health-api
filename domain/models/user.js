const Model = require('objection').Model;
const timestampUpdateWrapper = require('./wrappers/timestampUpdateWrapper');

class User extends Model {
    static get tableName() {
        return 'User';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: {type: 'integer'},
                uid: {type: 'string'},
                email: {type: 'string'},
                passwordHash: {type: 'string'},
                createdAt: {type: 'dateTime'},
                updatedAt: {type: 'dateTime'},
            }
        };
    }

    static get relationMappings() {
        const Profile = require('./profile');
        const Reservation = require('./reservation');
        return {
            profile: {
                relation: Model.HasOneRelation,
                modelClass: Profile,
                join: {
                    from: `${User.tableName}.id`,
                    to: `${Profile.tableName}.user_id_fk`,
                }
            }
        }
    }
}

module.exports = timestampUpdateWrapper(User);