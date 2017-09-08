const UserModel = require('./models/user');
const ProfileModel = require('./models/profile');
const Objection = require('objection');
const PasswordUtils = require('../utils/passwordUtils');
const Auth = require('../utils/auth');
const JWT = require('jsonwebtoken');
const Config = require('../config');
const Token = require('../utils/token');

const _decodeToken = (token) => {
    try {
        let decoded = JWT.verify(token, Config.TOKEN_SECRET);
        return decoded.data;
    } catch (err) {
        return null;
    }
}

class DomainUser {
    async isUserAlreadyRegistered({email}) {
        let result = await UserModel.query().select().where({email}).first();
        return !!result;
    }

    async registerNewUser({email, password, uid}) {
        return await Objection.transaction(UserModel.knex(), async (trx) => {
            return await UserModel.query(trx)
                .insert({
                    email,
                    passwordHash: PasswordUtils.hashPassword(password),
                    uid,
                })
                .pick(['email']);
        });
    }

    async canLoginWithEmailAndPassword({email, password}) {
        let existingUser = await UserModel.query().where({email}).first();
        if (existingUser && PasswordUtils.isPasswordCorrect(password, existingUser.passwordHash)) {
            return true;
        } else {
            return false;
        }
    }

    async getUser({email}) {
        return await UserModel.query().where({email}).first();
    }

    async getUserWithProfile({email}) {
        return await UserModel.query().where({email}).first().eager("profile");
    }

    async getUserIdForToken(token) {
        let decoded = _decodeToken(token);
        let userId = decoded.userId;
        let savedToken = await Token.getTokenForUser(userId); //- if a token is expired, then this will return null

        //- need to double check if this token is the LATEST ONE SET FOR THIS USER
        if (savedToken === token) {
            return userId;
        } else {
            return null;
        }
    }

    async removeTokenForUserId(userId) {
        return Token.removeTokenForUser(userId);
    }

    async createTokenForUser(userId) {
        let token = JWT.sign(
            {data: {userId: userId}},
            Config.TOKEN_SECRET,
        );
        await Token.setTokenForUser({userId, token});
        return token;
    }

    async setNewPasswordForUserId({userId, password}) {
        return UserModel.query()
            .patch({password: password})
            .where({id: userId})
            .first();
    }
}



module.exports = DomainUser;