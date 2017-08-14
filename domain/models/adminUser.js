const Model = require('objection').Model;
const timestampUpdateWrapper = require('./wrappers/timestampUpdateWrapper');

class AdminUser extends Model {
    static get tableName() {
        return 'AdminUser';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: {type: 'integer'},
                email: {type: 'string'},
                passwordHash: {type: 'string'},
                createdAt: {type: 'dateTime'},
                updatedAt: {type: 'dateTime'},
            }
        };
    }
}

module.exports = timestampUpdateWrapper(AdminUser);