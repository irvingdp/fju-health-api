const express = require('express');
const DomainUser = require('../domain/user');
const Auth = require('../utils/auth')
const {UserAlreadyRegisteredError, UserLoginFailedError} = require('../error/error');

const Model = require('objection').Model;
const Knex = require('knex');
const knexConfig = require('../gen/knex/knexfile');
let knex = Knex(knexConfig.development);
Model.knex(knex);

let router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        let isUserAlreadyRegistered = await DomainUser.isUserAlreadyRegistered(req.body);
        if (isUserAlreadyRegistered) {
            throw new UserAlreadyRegisteredError();
        } else {
            let registeredUser = await DomainUser.registerNewUser(req.body);
            res.json({
                user: registeredUser,
                token: Auth.genToken(registeredUser.email)
            });
        }
    } catch (error) {
        next(error);
    }
});
router.post('/login', async (req, res, next) => {
    try {
        let existingUser = await DomainUser.loginWithEmailAndPassword(req.body);
        if(existingUser) {
            res.json({
                user: existingUser,
                token: Auth.genToken(existingUser.email)
            });
        } else {
            throw new UserLoginFailedError()
        }
    } catch (error) {
        next(error);
    }
});


module.exports = router;