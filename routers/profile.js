const express = require('express');
const DomainUser = require('../domain/user');
const DomainProfile = require('../domain/profile');

const Model = require('objection').Model;
const Knex = require('knex');
const knexConfig = require('../gen/knex/knexfile');
let knex = Knex(knexConfig.development);
Model.knex(knex);

let router = express.Router();
let domainUser = new DomainUser();
let domainProfile = new DomainProfile();

router.post('/', async (req, res, next) => {
    try {
        let currentUser = await domainUser.getUser({email: req.authentication.email});
        await domainProfile.createProfile({
            userModal: currentUser,
            name: req.body.name,
            birthday: req.body.birthday,
            gender: req.body.gender,
            contactAddress: req.body.contactAddress,
            phoneNumber: req.body.phoneNumber,
        });
        res.status(200).json({});
    } catch (error) {
        next(error);
    }
});

module.exports = router;