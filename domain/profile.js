const ProfileModel = require('./models/profile');
const objection = require('objection');

class DomainProfile {
    async createProfile({userModal, name, birthday, gender, contactAddress, phoneNumber}) {
        return await objection.transaction(ProfileModel.knex(), async (trx) => {
            let profile = await ProfileModel.query(trx)
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

    async updateProfile({profileModal, name, birthday, gender, contactAddress, phoneNumber}) {
        return await profileModal.$query().update({name, birthday, gender, contactAddress, phoneNumber});
    }

    async getProfile(userModal) {
        return await ProfileModel.query().where('user_id_fk', userModal.id).first();
    }

}

module.exports = DomainProfile;