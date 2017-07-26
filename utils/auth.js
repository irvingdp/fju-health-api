const jwt = require('jsonwebtoken')
const config = require('../config')

class Auth {
    static auth(req) {
        let token = req.headers.authorization;
        try {
            let decoded = jwt.verify(token, config.TOKEN_SECRET);
            return decoded.data
        } catch (err) {
            console.log(err);
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