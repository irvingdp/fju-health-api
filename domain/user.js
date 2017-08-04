const UserModel = require('./models/user');
const ProfileModel = require('./models/profile');
const objection = require('objection');
const PasswordUtils = require('../utils/passwordUtils');
const Auth = require('../utils/auth');

class DomainUser {
    async isUserAlreadyRegistered({email}) {
        let result = await UserModel.query().select().where({email}).first();
        return !!result;
    }

    async registerNewUser({email, password, uid}) {
        return await objection.transaction(UserModel.knex(), async (trx) => {
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
}

module.exports = DomainUser;