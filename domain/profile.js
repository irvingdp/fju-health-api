const ProfileModel = require('./models/profile');
const objection = require('objection');

class DomainProfile {
    async createProfile({userModal, name, birthday, gender, contactAddress, phoneNumber}) {
        return await objection.transaction(ProfileModel.knex(), async (trx) => {
            let profile =  await ProfileModel.query(trx)
                .insert({
                    name,
                    birthday,
                    gender,
                    contactAddress,
                    phoneNumber,
                })
            return await profile.$relatedQuery('user', trx).relate(userModal);
        })
    }
}

module.exports = DomainProfile;