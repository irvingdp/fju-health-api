const JWT = require('jsonwebtoken')
const Config = require('../config')
const Token = require('./token')

const Auth = {
    auth: (token) => {
        if(Token.isExpired(token)) {
            Token.remove(token);
            return null;
        } else {
            Token.update(token);
            return _decode(token);
        }
    },
    genToken: (email) => {
        let token = JWT.sign(
            {data: {email: email}},
            Config.TOKEN_SECRET,
        );
        Token.add(token);
        return token;
    },
};

const _decode = (token) => {
    try {
        let decoded = JWT.verify(token, Config.TOKEN_SECRET);
        return decoded.data;
    } catch (err) {
        return null;
    }
};
module.exports = Auth;