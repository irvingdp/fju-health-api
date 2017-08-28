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


router.get('/', async (req, res, next) => {
    try {
        let currentUser = await domainUser.getUser({email: req.authentication.email});
        let reserved = await domainReservation.getMyLatestReservationByUserId(currentUser.id);

        (reserved.reminder || []).forEach(reminder => {
            reminder.notifyDate = reminderManager.getNotifyDate(reminder.key, reserved.reserveDate);
        });

        let profile = await domainProfile.getProfile(currentUser);
        let package = await domainPackage.listPackages();
        res.status(200).json({
            reserved: reserved,
            profile: profile,
            package: package,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;