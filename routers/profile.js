const express = require('express');
const DomainUser = require('../domain/user');
const DomainProfile = require('../domain/profile');
const {DuplicateProfileError} = require('../error/error');

let router = express.Router();
let domainUser = new DomainUser();
let domainProfile = new DomainProfile();

router.post('/', async (req, res, next) => {
    try {
        let currentUser = await domainUser.getUserWithProfile({email: req.authentication.email});
        if(currentUser.profile) {
            await domainProfile.createProfile({
                userModal: currentUser,
                name: req.body.name,
                birthday: req.body.birthday,
                gender: req.body.gender,
                contactAddress: req.body.contactAddress,
                phoneNumber: req.body.phoneNumber,
            });
        } else {
            throw new DuplicateProfileError()
        }
        res.status(200).json({});
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        let currentUser = await domainUser.getUserWithProfile({email: req.authentication.email});
        let updatedProfile = await domainProfile.updateProfile({
            profileModal: currentUser.profile,
            name: req.body.name,
            contactAddress: req.body.contactAddress,
            phoneNumber: req.body.phoneNumber,
            email: currentUser.profile.email,
        });
        res.status(200).json(updatedProfile);
    } catch (error) {
        next(error);
    }
});


module.exports = router;