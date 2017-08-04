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
                displayPrice: {type: 'string'},
                gender: {
                    type: 'string',
                    enum: ['male', 'female'],
                },
                group: {type: 'integer'},
                order: {type: 'integer'},
                createdAt: {type: 'dateTime'},
                updatedAt: {type: 'dateTime'},
            }
        };
    }
}

module.exports = timestampUpdateWrapper(Package);