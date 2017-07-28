const jwt = require('jsonwebtoken')
const config = require('../config')
const {TokenExpiredError} = require('../error/error');

class Auth {
    static auth(token) {
        try {
            let decoded = jwt.verify(token, config.TOKEN_SECRET);
            return decoded.data;
        } catch (err) {
            if (err.constructor.name === "TokenExpiredError") {
                let newToken = this.genNewToken(token);
                //TODO: Ivan , if error type is token expiry but last access time not expiry, should gen a new token automatically , use in-memory db to record the last-access time. ex: Redis
                throw new TokenExpiredError(null, newToken) //return a special status code (499) and included new token , then client should use new token on next request.
            } else {
                return null;
            }
        }
    }

    static genNewToken(expiredToken) {
        let expiredData = jwt.verify(expiredToken, config.TOKEN_SECRET, {ignoreExpiration: true}); //decode the expired token
        return this.genToken(expiredData.data.email);
    }

    static genToken(email) {
        return jwt.sign(
            {data: {email: email}},
            config.TOKEN_SECRET,
            {expiresIn: config.TOKEN_EXPIRES_IN_SEC}
        );
    }

}
module.exports = Auth;