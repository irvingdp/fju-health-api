const Model = require('objection').Model;

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                id: {type: 'integer'},
                name: {type: 'string'},
                salt: {type: 'string'},
                passwordHash: {type: 'string'},
            }
        };
    }
}

module.exports = User;