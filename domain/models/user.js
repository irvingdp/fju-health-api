const Model = require('objection').Model;

class User extends Model {
    static get tableName() {
        return 'User';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: {type: 'integer'},
                email: {type: 'string'},
                salt: {type: 'string'},
                passwordHash: {type: 'string'},
                createdAt: {type: 'dateTime'},
                updatedAt: {type: 'dateTime'},
            }
        };
    }
}

module.exports = User;