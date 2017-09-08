const config = require('../config');
const moment = require('moment');
const redisClient = require('../utils/redisClient');

const Token = {
    isExpired: (token) => {
        if (_isExisting(token)) {
            let currentTime = moment().utc();
            if (currentTime - _getLastAccessTime(token) > (config.TOKEN_EXPIRES_IN_SEC * 1000)) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    },
    add: (token) => {
        return redisClient.setAsync(token, moment().utc());
    },
    update: (token) => {
        return redisClient.setAsync(token, moment().utc());
    },
    remove: (token) => {
        delete redisClient.delAsync(token);
    }
}
const _getLastAccessTime = (token) => {
    return redisClient.getAsync(token);
}
const _isExisting = (token) => {
    return redisClient.existsAsync(token);
}

module.exports = Token;