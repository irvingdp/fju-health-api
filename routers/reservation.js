const express = require('express');
const DomainUser = require('../domain/user');
const DomainReservation = require('../domain/reservation');
const DomainPackage = require('../domain/package');
const DomainProfile = require('../domain/profile');
const DomainReminder = require('../domain/reminder');
const DomainAdminUser = require('../domain/adminUser');
const moment = require('moment');
const Enums = require('../enums');
const MailUtil = require('../utils/mail');

let router = express.Router();
let domainUser = new DomainUser();
let domainReservation = new DomainReservation();
let domainPackage = new DomainPackage();
let domainProfile = new DomainProfile();
let domainReminder = new DomainReminder();
let domainAdminUser = new DomainAdminUser();
let mailUtil = new MailUtil();

router.post('/', async (req, res, next) => {
    let currentUser, currentProfile, packageModal, profileData;
    try {
        currentUser = await domainUser.getUser({email: req.authentication.email});
        packageModal = await domainPackage.getPackage({id: req.body.packageId});
        currentProfile = await domainProfile.getProfile(currentUser);

        profileData = {
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
            key: Enums.reminderKeys.LOW_RESIDUE_DIET_3,
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

        //send email to admin user after reserved
        //TODO: design the mail's content?
        try {
            let adminUserEmails = await domainAdminUser.listAllAdminUserEmails();
            if(adminUserEmails && adminUserEmails.length > 0) {
                await mailUtil.sendMail({
                    recipient: adminUserEmails.map(admin => admin.email).join(","),
                    subject: "fju service notification - reservation incoming",
                    body: "[Reservation information] \n"
                    + "name:" + profileData.name + "\n"
                    + "phone:" + profileData.phoneNumber + "\n"
                    + "address:" + profileData.contactAddress + "\n"
                })
            }
        } catch (error) {
            //if any send email error , catch here and still response 200
            console.log(error);
        }

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