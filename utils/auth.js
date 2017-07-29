const jwt = require('jsonwebtoken')
const config = require('../config')
const session = require('./session')

class Auth {
    static auth(token) {
        if(session.isExpired(token)) {
            if(_isTokenExpired(token)) {
               session.remove(token);
               return null;
            } else {
                session.update(token);
                return _decode(token);
            }
        } else {
            return _decode(token, true); //if session not expired , don't consider the token expire or not.
        }

    }
    static genToken(email) {
        let token = jwt.sign(
            {data: {email: email}},
            config.TOKEN_SECRET,
            {expiresIn: config.TOKEN_EXPIRES_IN_SEC}
        );
        session.add(token);
        return token;
    }
}
const _isTokenExpired = (token) => {
    try {
        jwt.verify(token, config.TOKEN_SECRET);
        return false;
    } catch (err) {
        if (err.constructor.name === "TokenExpiredError") {
            return true;
        } else {
            return false;
        }
    }
};
const _decode = (token, ignoreExpiration = false) => {
    try {
        let decoded = jwt.verify(token, config.TOKEN_SECRET, {ignoreExpiration});
        return decoded.data;
    } catch (err) {
        return null;
    }
};
module.exports = Auth;