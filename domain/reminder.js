const ReminderModel = require('./models/reminder');
const objection = require('objection');

class DomainReminder {
    async createReminder({key, isSent, reservationModal}) {
        return await objection.transaction(ReminderModel.knex(), async (trx) => {
            let reminder = await ReminderModel.query()
                .insert({
                    key,
                    isSent,
                });
            return await reminder.$relatedQuery('reservation', trx).relate(reservationModal);
        })
    }

    async setIsSent({reminderModel, isSent}) {
        return reminderModel.$query().patchAndFetch({isSent});
    }
}

module.exports = DomainReminder;