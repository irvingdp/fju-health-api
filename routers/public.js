const express = require('express');
const DomainUser = require('../domain/user');
const Auth = require('../utils/auth');
const DomainDevice = require('../domain/device');
const DomainPackage = require('../domain/package');

const {UserAlreadyRegisteredError, UserLoginFailedError} = require('../error/error');

let router = express.Router();
let domainUser = new DomainUser();
let domainDevice = new DomainDevice();
let domainPackage = new DomainPackage();

router.post('/register', async (req, res, next) => {
    try {
        let isUserAlreadyRegistered = await domainUser.isUserAlreadyRegistered(req.body);
        if (isUserAlreadyRegistered) {
            throw new UserAlreadyRegisteredError();
        } else {
            let registeredUser = await domainUser.registerNewUser(req.body);
            res.json({
                token: Auth.genToken(registeredUser.email)
            });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        let isLogin = await domainUser.canLoginWithEmailAndPassword(req.body);
        if (isLogin) {
            res.json({
                token: Auth.genToken(req.body.email)
            });
        } else {
            throw new UserLoginFailedError()
        }
    } catch (error) {
        next(error);
    }
});

router.post('/fcmtoken', async (req, res, next) => {
    try {
        let device = await domainDevice.getDeviceByToken(req.body.fcm_token);
        if(!device) {
            await domainDevice.createDevice({
                token: req.body.fcm_token,
            });
        }
        res.status(200).json({});
    } catch (error) {
        next(error);
    }
});

router.get('/package/details', async (req, res, next) => {
    try {
        res.json(domainPackage.getPackagesDetail())
    } catch (error) {
        next(error);
    }
});

module.exports = router;