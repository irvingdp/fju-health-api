const Model = require('objection').Model;
const timestampUpdateWrapper = require('./wrappers/timestampUpdateWrapper');
const AppLabels = require('../../data/appLabels');
const Locale = require('../../locale');

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
        return AppLabels[Locale.getLocale()][this.key] ? AppLabels[Locale.getLocale()][this.key].title : "";
    }

    get description() {
        return AppLabels[Locale.getLocale()][this.key] ? AppLabels[Locale.getLocale()][this.key].description : "";
    }
}

module.exports = timestampUpdateWrapper(Package);