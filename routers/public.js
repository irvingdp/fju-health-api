const express = require('express');
const Auth = require('../utils/auth');
const DomainUser = require('../domain/user');
const DomainDevice = require('../domain/device');
const DomainPackage = require('../domain/package');
const logger = require('log4js').getLogger();
const {UserAlreadyRegisteredError, UserLoginFailedError, UserDoesNotExist} = require('../error/error');
const {URL} = require('url');
const Config = require('../config');
const Mail = require('../utils/mail');
const template = require('ejs');
const PasswordUtils = require('../utils/passwordUtils');

let router = express.Router();
let domainUser = new DomainUser();
let domainDevice = new DomainDevice();
let domainPackage = new DomainPackage();
let mailUtil = new Mail();

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

/**
 * User has forgotten their password
 */
router.post('/forgetPassword/generate', async (req, res, next) => {
    try {
        let {email} = req.body;

        logger.debug(`[${req.id}] User forgot password: ${email}`);

        //- Generate reset token
        let user = await domainUser.getUser({email});

        if (user) {
            let token = await domainUser.createTokenForUser(user.id);
            logger.debug(`[${req.id}] Set forgot password token for user id ${user.id} : ${token}`);

            //- Send a link for user to reset their password
            let link = new URL(`/user/forgetPassword/reset/${token}`, Config.DOMAIN_NAME);

            logger.debug(`[${req.id}] Send reset password link to email: ${email}`);
            let result = await mailUtil.sendMail({
                recipient: email,
                subject: "Link to reset your password",
                //TODO: (Erwin) different language template from DB
                body: template.render("link here: <%= link %>",
                    {link: link}
                ),
            });
            logger.debug(`[${req.id}] result: ${JSON.stringify(result)}`);

            res.sendStatus(200);
        } else {
            throw new UserDoesNotExist();
        }
    } catch (error) {
        next(error);
    }
});


/**
 * Page to enter new password
 */
router.get('/forgetPassword/reset/:token', async (req, res) => {
    let {token} = req.params;

    let userId = await domainUser.getUserIdForToken(token);
    if (userId) {
        logger.debug(`[${req.id}] Let user with id (${userId})set a password`);

        res.render('resetpassword.html');
    } else {
        res.sendStatus(403);
    }
});

/**
 * Set a new password for user
 */
router.post('/forgetPassword/setNewPassword/', async (req, res) => {
    let {token, password} = req.body;

    let userId = await domainUser.getUserIdForToken(token);
    if (userId && password) {
        logger.debug(`[${req.id}] Let user with id (${userId}) set a new password`);
        const hashedPassword = PasswordUtils.hashPassword(password);
        await domainUser.setNewPasswordForUserId({userId, password: hashedPassword});

        //- Remove token so the same token won't be used again.
        await domainUser.removeTokenForUserId(userId);

        res.send(200);
    } else {
        res.sendStatus(403);
    }
});
module.exports = router;