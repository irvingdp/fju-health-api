const config = require('../config');
const moment = require('moment');

var TOKENS = {};

//TODO: use Redis instead of in memory storage , for distribution api structure.
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
        TOKENS[token] = moment().utc();
    },
    update: (token) => {
        TOKENS[token] = moment().utc();
    },
    remove: (token) => {
        delete TOKENS[token];
    }
}
const _getLastAccessTime = (token) => {
    return TOKENS[token];
}
const _isExisting = (token) => {
    return TOKENS[token];
}

module.exports = Token;