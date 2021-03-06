const Model = require('objection').Model;
const timestampUpdateWrapper = require('./wrappers/timestampUpdateWrapper');

class Profile extends Model {
    static get tableName() {
        return 'Profile';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: {type: 'integer'},
                name: {type: 'string'},
                birthday: {type: 'dateTime'},
                gender: {
                    type: 'string',
                    enum: ['male', 'female'],
                },
                contactAddress: {type: 'string'},
                phoneNumber: {type: 'string'},
                createdAt: {type: 'dateTime'},
                updatedAt: {type: 'dateTime'},
                user_id_fk: {type: 'references'},
            }
        };
    }

    static get relationMappings() {
        const User = require('./user');
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: `${Profile.tableName}.user_id_fk`,
                    to: `${User.tableName}.id`,
                }
            }
        }
    }
}

module.exports = timestampUpdateWrapper(Profile);