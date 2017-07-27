const jwt = require('jsonwebtoken')
const config = require('../config')

class Auth {
    static auth(req) {
        let token = req.headers.authorization;
        try {
            let decoded = jwt.verify(token, config.TOKEN_SECRET);
            return decoded.data
        } catch (err) {
            //TODO: Ivan , if error type is token expiry but last access time not expiry, should gen a new token automatically
            //use in-memory db to record the last-access time. ex: Redis
            return null
        }
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