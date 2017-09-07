const express = require('express');
const DomainUser = require('../domain/user');
const DomainProfile = require('../domain/profile');
const DomainReservation = require('../domain/reservation');
const DomainPackage = require('../domain/package');
const reminderManager = require('../utils/reminderManager')

let router = express.Router();
let domainUser = new DomainUser();
let domainProfile = new DomainProfile();
let domainReservation = new DomainReservation();
let domainPackage = new DomainPackage();

let sortByNotifyDate = (a, b) => {
    if (a.notifyDate < b.notifyDate)
        return -1;
    if (a.notifyDate > b.notifyDate)
        return 1;
    return 0;
}
router.get('/', async (req, res, next) => {
    try {
        let currentUser = await domainUser.getUser({email: req.authentication.email});
        let reserved = await domainReservation.getMyLatestReservationByUserId(currentUser.id);

        if(reserved && reserved.reminder instanceof Array) {
            (reserved.reminder || []).forEach(reminder => {
                reminder.notifyDate = reminderManager.getNotifyDate(reminder.key, reserved.reserveDate);
            });
            reserved.reminder && reserved.reminder.sort(sortByNotifyDate);
        }

        let profile = await domainProfile.getProfile(currentUser);
        let package = await domainPackage.listPackages();

        //TODO: mock the test data first for testing. report should order by date desc

        let report = [
            {
                reservation: {
                    reserveDate: "2017-08-30T00:00:00.000Z",
                    package: package[1]
                }
            },
            {
                reservation: {
                    reserveDate: "2016-08-31T00:00:00.000Z",
                    package: package[2]
                }
            },
            {
                reservation: {
                    reserveDate: "2015-08-30T00:00:00.000Z",
                    package: package[3]
                }
            }
        ]
        res.status(200).json({
            reserved: reserved,
            profile: profile,
            package: package,
            report: report,
            user: {
                email: currentUser.email,
                uid: currentUser.uid,
            },
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;