const Enums = require('../enums');
const moment = require('moment');

const ReminderManager = {
    getNotifyDate: (key, reserveDate) => {
        switch (key) {
            case Enums.reminderKeys.LOW_RESIDUE_DIET_1:
                return moment(reserveDate).subtract(3, "days").toISOString();

            case Enums.reminderKeys.LOW_RESIDUE_DIET_2:
                return moment(reserveDate).subtract(2, "days").toISOString();

            case Enums.reminderKeys.SPECIMEN_COLLECTION:
                return moment(reserveDate).subtract(1, "days").toISOString();

            case Enums.reminderKeys.CATHARTIC:
                return moment(reserveDate).subtract(5, "hours").toISOString();;
        }
    },
};
module.exports = ReminderManager;