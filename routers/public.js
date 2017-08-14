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
let domainUser = new DomainUser();

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


module.exports = router;