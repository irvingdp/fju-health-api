const jwt = require('jsonwebtoken')
const config = require('../config')

class Auth {
    static auth(token) {
        try {
            let decoded = jwt.verify(token, config.TOKEN_SECRET);
            return decoded.data;
        } catch (err) {
            return null;
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