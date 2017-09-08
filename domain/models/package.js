const Model = require('objection').Model;
const timestampUpdateWrapper = require('./wrappers/timestampUpdateWrapper');
const appLabel = require('../../data/appLabels')

class Package extends Model {
    static get tableName() {
        return 'Package';
    }

    static get jsonSchema() {
        return {
            type: 'object',

            properties: {
                id: {type: 'integer'},
                key: {type: 'string'},
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

    static get virtualAttributes() {
        return ['title', 'description'];
    }

    get title() {
        return appLabel[this.key] ? appLabel[this.key].title : "";
    }

    get description() {
        return appLabel[this.key] ? appLabel[this.key].description : "";
    }
}

module.exports = timestampUpdateWrapper(Package);