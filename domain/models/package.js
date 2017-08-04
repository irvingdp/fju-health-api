const Model = require('objection').Model;
const timestampUpdateWrapper = require('./wrappers/timestampUpdateWrapper');

class Package extends Model {
    static get tableName() {
        return 'Package';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: {type: 'integer'},
                title: {type: 'string'},
                description: {type: 'string'},
                price: {type: 'integer'},
                gender: {
                    type: 'string',
                    enum: ['male', 'female'],
                },
                createdAt: {type: 'dateTime'},
                updatedAt: {type: 'dateTime'},
            }
        };
    }
}

module.exports = timestampUpdateWrapper(Package);