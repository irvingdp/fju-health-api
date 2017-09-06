const DeviceModel = require('./models/device');
const objection = require('objection');

class DomainDevice {
    async createDevice({token}) {
        return await DeviceModel.query().insert({token});
    }

    async relateTokenToUser({deviceModal, userModal}) {
        return await deviceModal.$relatedQuery('user').relate(userModal);
    }

    async getDeviceByToken(token) {
        return await DeviceModel.query().where({token: token}).first();
    }
}

module.exports = DomainDevice;