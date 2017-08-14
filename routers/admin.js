const express = require('express');
const DomainAdminUser = require('../domain/adminUser');
const {UserLoginFailedError} = require('../error/error');
const Auth = require('../utils/auth');

let router = express.Router();
let domainAdminUser = new DomainAdminUser();

router.post('/login', async (req, res, next) => {
    try {
        let isLogin = await domainAdminUser.canLoginWithEmailAndPassword(req.body);
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

router.post('/register', async (req, res, next) => {
    try {
        let isUserAlreadyRegistered = await domainAdminUser.isUserAlreadyRegistered(req.body);
        if (isUserAlreadyRegistered) {
            throw new UserAlreadyRegisteredError();
        } else {
            let registeredUser = await domainAdminUser.registerNewUser(req.body);
            res.json({
                token: Auth.genToken(registeredUser.email)
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;