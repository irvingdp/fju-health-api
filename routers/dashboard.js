const express = require('express');
const DomainUser = require('../domain/user');
const DomainProfile = require('../domain/profile');
const DomainReservation = require('../domain/reservation');

let router = express.Router();
let domainUser = new DomainUser();
let domainProfile = new DomainProfile();
let domainReservation = new DomainReservation();

router.get('/', async (req, res, next) => {
    try {
        let currentUser = await domainUser.getUser({email: req.authentication.email});
        let reservation = await domainReservation.getMyLatestReservationByUserId(currentUser.id);
        let profile = await domainProfile.getProfile(currentUser);
        res.status(200).json({
            reservation: reservation,
            profile: profile,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;