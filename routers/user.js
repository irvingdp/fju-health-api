const express = require('express');
const User = require('../domain/models/user');
const Model = require('objection').Model;

const Knex = require('knex');
const knexConfig = require('../gen/knex/knexfile');
let knex = Knex(knexConfig.development);
Model.knex(knex);

let router = express.Router();

/**
 * Demo: Simple insert
 */
router.post('/insert', (req, res, next) => {
    let {name, salt, passwordHash} = req.body;

    if (name) {
        User.query()
            .insert({name: name, salt: salt, passwordHash: passwordHash})
            .then((result) => {
                console.log(result);
                res.sendStatus(200);
            })
            .catch((error) => {
                console.error(error);
                res.sendStatus(500);
            })
        ;
    } else {
        res.sendStatus(400);
    }
});

/**
 * Demo: update an existing model object without using ".update().where()"
 */
router.post('/queryThenUpdate', (req, res, next) => {
    let {id, name, salt, passwordHash} = req.body;
    if (id) {
        User.query()
            .where({id: id})
            .then((result) => {
                result = result[0];
                return result.$query().updateAndFetch({name, salt, passwordHash});
            })
            .then((result) => {
                console.log(result);
                res.sendStatus(200);
            })
            .catch((error) => {
                console.error(error);
                res.sendStatus(500);
            })
        ;
    } else {
        res.sendStatus(400);
    }
});

// /**
//    Demo: Async & await
//    Commented - use node version > 7 before proceeding
//  */
// router.post('/queryAsyncAwait', async (req, res, next) => {
//     let result = await User.query().where(req.body)
//     res.send(result);
// });

module.exports = router;