const AdminUserModel = require('./models/adminUser');
const PasswordUtils = require('../utils/passwordUtils');
const Objection = require('objection');

class DomainAdminUser {
    async canLoginWithEmailAndPassword({email, password}) {
        let existingAdminUser = await AdminUserModel.query().where({email}).first();
        if (existingAdminUser && PasswordUtils.isPasswordCorrect(password, existingAdminUser.passwordHash)) {
            return true;
        } else {
            return false;
        }
    }

    async isUserAlreadyRegistered({email}) {
        let result = await AdminUserModel.query().select().where({email}).first();
        return !!result;
    }

    async registerNewUser({email, password}) {
        return await Objection.transaction(AdminUserModel.knex(), async (trx) => {
            return await AdminUserModel.query(trx)
                .insert({
                    email,
                    passwordHash: PasswordUtils.hashPassword(password),
                })
                .pick(['email']);
        });
    }
}

module.exports = DomainAdminUser;