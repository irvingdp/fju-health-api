const express = require('express');
const DomainUser = require('../domain/user');
const DomainReservation = require('../domain/reservation');
const DomainPackage = require('../domain/package');

const Model = require('objection').Model;
const Knex = require('knex');
const knexConfig = require('../gen/knex/knexfile');
let knex = Knex(knexConfig.development);
Model.knex(knex);

let router = express.Router();
let domainUser = new DomainUser();
let domainReservation = new DomainReservation();
let domainPackage = new DomainPackage();

router.post('/', async (req, res, next) => {
    try {
        let currentUser = await domainUser.getUser({email: req.authentication.email});
        let packageModal = await domainPackage.getPackage({id: req.body.packageId});
        await domainReservation.createReservation({
            userModal: currentUser,
            packageModal: packageModal,
            reserveDate: req.body.reserveDate,
            status: req.body.status,
            paymentDate: req.body.paymentDate,
            isSentPackage: req.body.isSentPackage,
            sentPackageDate: req.body.sentPackageDate,
            isAgentCalled: req.body.isAgentCalled,
            agentCalledDate: req.body.agentCalledDate,
        });
        res.status(200).json({});
    } catch (error) {
        next(error);
    }
});

module.exports = router;