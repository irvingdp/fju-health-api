const UserModel = require('./models/user');
const ProfileModel = require('./models/profile');
const objection = require('objection');
const PasswordUtils = require('../utils/passwordUtils');
const Auth = require('../utils/auth');

class DomainUser {
    static async isUserAlreadyRegistered({email}) {
        return await objection.transaction(UserModel.knex(), async (trx) => {
            let result = await UserModel.query(trx).select().where({email}).first();
            return !!result;
        });
    }

    static async registerNewUser({email, password}) {
        return await objection.transaction(UserModel.knex(), async (trx) => {
            return await UserModel.query(trx)
                .insert({
                    email,
                    passwordHash: PasswordUtils.hashPassword(password),
                })
                .pick(['email']);
        });
    }

    static async canLoginWithEmailAndPassword({email, password}) {
        return await objection.transaction(UserModel.knex(), async (trx) => {
            let existingUser = await UserModel.query(trx).where({email}).first();
            if (existingUser && PasswordUtils.isPasswordCorrect(password, existingUser.passwordHash)) {
                return true;
            } else {
                return false;
            }
        });
    }


}

module.exports = DomainUser;