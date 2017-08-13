const ReservationModel = require('./models/reservation');
const objection = require('objection');

class DomainReservation {
    async createReservation({userModal, packageModal, reserveDate, status, paymentDate, sentPackageDate, agentCalledDate}) {
        return await objection.transaction(ReservationModel.knex(), async (trx) => {
            let reservation = await ReservationModel.query()
                .insert({
                    reserveDate,
                    status,
                    paymentDate,
                    sentPackageDate,
                    agentCalledDate
                })
            await reservation.$relatedQuery('user', trx).relate(userModal);
            return await reservation.$relatedQuery('package', trx).relate(packageModal);
        })
    }
}

module.exports = DomainReservation;