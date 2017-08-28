const express = require('express');
const DomainUser = require('../domain/user');
const DomainReservation = require('../domain/reservation');
const DomainPackage = require('../domain/package');
const DomainProfile = require('../domain/profile');
const DomainReminder = require('../domain/reminder');
const moment = require('moment');
const Enums = require('../enums');

let router = express.Router();
let domainUser = new DomainUser();
let domainReservation = new DomainReservation();
let domainPackage = new DomainPackage();
let domainProfile = new DomainProfile();
let domainReminder = new DomainReminder();

router.post('/', async (req, res, next) => {
    try {
        let currentUser = await domainUser.getUser({email: req.authentication.email});
        let packageModal = await domainPackage.getPackage({id: req.body.packageId});

        let currentProfile = await domainProfile.getProfile(currentUser);

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
            profileData.userModal = currentUser;
            await domainProfile.createProfile(profileData)
        }
        let reserveDateTime = moment(req.body.reserveDate).toISOString(); //TODO: default reserve time is 00:00(UTC) , means AM 08:00(+8)

        let reservationModal = await domainReservation.createReservation({
            userModal: currentUser,
            packageModal: packageModal,
            reserveDate: reserveDateTime,
            status: "paymentPending",
            paymentDate: null,
            sentPackageDate: null,
            agentCalledDate: null,
        });
        //TODO: transation not working.. trx need pass to every await...
        await domainReminder.createReminder({
            key: Enums.reminderKeys.LOW_RESIDUE_DIET_1,
            isSent: false,
            reservationModal
        });
        await domainReminder.createReminder({
            key: Enums.reminderKeys.LOW_RESIDUE_DIET_2,
            isSent: false,
            reservationModal
        });
        await domainReminder.createReminder({
            key: Enums.reminderKeys.SPECIMEN_COLLECTION,
            isSent: false,
            reservationModal
        });
        await domainReminder.createReminder({
            key: Enums.reminderKeys.CATHARTIC,
            isSent: false,
            reservationModal
        });
        res.status(200).json({});
    } catch (error) {
        next(error);
    }
});

router.get('/listReservations', async (req, res, next) => {
    try {
        let reservations = await new DomainReservation().listReservations();
        res.status(200).json(reservations);
    } catch (error) {
        next(error);
    }
});

router.put('/:reservationId/reserveDate/', async (req, res, next) => {
    try {
        let reservationId = req.params.reservationId;
        let reserveDate = moment(req.body.reserveDate).toISOString();
        let reservationModel = await new DomainReservation().getReservationById(reservationId);
        reservationModel = await new DomainReservation().setReservationDate({reservationModel, reserveDate});
        res.status(200).json(reservationModel);
    } catch (error) {
        next(error);
    }
});

router.put('/:reservationId/paymentDate/', async (req, res, next) => {
    try {
        let reservationId = req.params.reservationId;
        let paymentDate = moment(req.body.paymentDate).toISOString();
        let reservationModel = await new DomainReservation().getReservationById(reservationId);
        reservationModel = await new DomainReservation().setPaymentDate({reservationModel, paymentDate});
        res.status(200).json(reservationModel);
    } catch (error) {
        next(error);
    }
});

router.put('/:reservationId/sentPackageDate/', async (req, res, next) => {
    try {
        let reservationId = req.params.reservationId;
        let sentPackageDate = moment(req.body.sentPackageDate).toISOString();
        let reservationModel = await new DomainReservation().getReservationById(reservationId);
        reservationModel = await new DomainReservation().setPackageSentDate({reservationModel, sentPackageDate});
        res.status(200).json(reservationModel);
    } catch (error) {
        next(error);
    }
});

router.put('/:reservationId/agentCalledDate/', async (req, res, next) => {
    try {
        let reservationId = req.params.reservationId;
        let agentCalledDate = moment(req.body.agentCalledDate).toISOString();
        let reservationModel = await new DomainReservation().getReservationById(reservationId);
        reservationModel = await new DomainReservation().setAgentCallDate({reservationModel, agentCalledDate});
        res.status(200).json(reservationModel);
    } catch (error) {
        next(error);
    }
});

module.exports = router;