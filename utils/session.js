const config = require('../config');
const moment = require('moment');

var sessions = {};

//TODO: use Redis instead of in memory storage , for distribution api structure.
class Session {
    static isExpired(token) {
        if(!_isExisting(token)) {
            return true;
        } else {
            let currentTime = moment().utc();
            if(currentTime - _getLastAccessTime(token) > (config.SESSION_EXPIRES_IN_SEC * 1000)) {
                return true;
            } else {
                return false;
            }
        }
    }
    static add(token) {
        sessions[token] = moment().utc();
    }
    static update(token) {
        sessions[token] = moment().utc();
    }
    static remove(token) {
        delete sessions[token];
    }
}
const _getLastAccessTime = (token) => {
    return sessions[token];
}
const _isExisting = (token) => {
    return sessions[token];
}

module.exports = Session;