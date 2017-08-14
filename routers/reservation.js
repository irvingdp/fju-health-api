const express = require('express');
const DomainUser = require('../domain/user');
const DomainReservation = require('../domain/reservation');
const DomainPackage = require('../domain/package');
const DomainProfile = require('../domain/profile');
const moment = require('moment');

const Model = require('objection').Model;
const Knex = require('knex');
const knexConfig = require('../gen/knex/knexfile');
let knex = Knex(knexConfig.development);
Model.knex(knex);

let router = express.Router();
let domainUser = new DomainUser();
let domainReservation = new DomainReservation();
let domainPackage = new DomainPackage();
let domainProfile = new DomainProfile();

router.post('/', async (req, res, next) => {
    try {
        let currentUsger = await domainUser.getUser({email: req.authentication.email});
        let packageModal = await domainPackage.getPackage({id: req.body.packageId});

        let currentProfile = await domainProfile.getProfile(currentUsger);

        let profileData = {
            name: req.body.name,
            birthday: req.body.birthday,
            phoneNumber: req.body.phoneNumber,
            contactAddress: req.body.contactAddress,
            gender: packageModal.gender
        };

        if (currentProfile) {
            profileData.profileModal = currentProfile;
            await domainProfile.updateProfile(profileData)
        } else {
            profileData.userModal = currentUsger;
            await domainProfile.createProfile(profileData)
        }
        let reserveDateTime = moment(req.body.reserveDate).toISOString(); //TODO: default reserve time is 00:00(UTC) , means AM 08:00(+8)

        await domainReservation.createReservation({
            userModal: currentUsger,
            packageModal: packageModal,
            reserveDate: reserveDateTime,
            status: "paymentPending",
            paymentDate: null,
            sentPackageDate: null,
            agentCalledDate: null,
        });
        res.status(200).json({});
    } catch (error) {
        next(error);
    }
});

router.get('/listReservations', async (req, res, next) => {
    let reservations = await new DomainReservation().listReservations();
    res.status(200).json(reservations);
});

module.exports = router;