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
                });
            await reservation.$relatedQuery('user', trx).relate(userModal);
            await reservation.$relatedQuery('package', trx).relate(packageModal);
            return reservation;
        })
    }

    async getMyLatestReservationByUserId(userId) {
        return ReservationModel.query().where({user_id_fk: userId}).orderBy('createdAt','desc').first().eager('[reminder, package]');
    }

    async getReservationByUser(userModal) {
        return ReservationModel.query().findById(reservationId);
    }

    async getReservationById(reservationId) {
        return ReservationModel.query().findById(reservationId);
    }

    async listReservations() {
        return ReservationModel.query().eager('[user.[profile], package]');
    }

    async setReservationDate({reservationModel, reserveDate}) {
        return reservationModel.$query().patchAndFetch({reserveDate});
    }

    async setPaymentDate({reservationModel, paymentDate}) {
        return reservationModel.$query().patchAndFetch({paymentDate, status: 'paymentCompleted'});
    }

    async setPackageSentDate({reservationModel, sentPackageDate}) {
        return reservationModel.$query().patchAndFetch({sentPackageDate});
    }

    async setAgentCallDate({reservationModel, agentCalledDate}) {
        return reservationModel.$query().patchAndFetch({agentCalledDate});
    }

    async getPaidReservation() {
        return ReservationModel.query().where({status: "paymentPending"}).eager('reminder.reservation.user.device');
    }
}

module.exports = DomainReservation;