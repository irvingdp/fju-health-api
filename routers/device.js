const express = require('express');
const DomainUser = require('../domain/user');
const DomainDevice = require('../domain/device');

let router = express.Router();
let domainDevice = new DomainDevice();
let domainUser = new DomainUser();

router.put('/', async (req, res, next) => {
    try {
        let currentUser = await domainUser.getUser({email: req.authentication.email});
        let device = await domainDevice.getDeviceByToken(req.body.fcm_token);
        if(device) {
            await domainDevice.relateTokenToUser({
                userModal: currentUser,
                deviceModal: device,
            });
        }
        res.status(200).json({});
    } catch (error) {
        next(error);
    }
});


module.exports = router;