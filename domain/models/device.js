const Model = require('objection').Model;
const timestampUpdateWrapper = require('./wrappers/timestampUpdateWrapper');

class Device extends Model {
    static get tableName() {
        return 'Device';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: {type: 'integer'},
                token: {type: 'string'},
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
                    from: `${Device.tableName}.user_id_fk`,
                    to: `${User.tableName}.id`,
                }
            }
        }
    }
}

module.exports = timestampUpdateWrapper(Device);