const express = require('express');
const DomainPackage = require('../domain/package');

const Model = require('objection').Model;
const Knex = require('knex');
const knexConfig = require('../gen/knex/knexfile');
let knex = Knex(knexConfig.development);
Model.knex(knex);

let router = express.Router();
let domainPackage = new DomainPackage();

router.get('/', async (req, res, next) => {
    try {
        let packages = await domainPackage.listPackages();
        res.json(packages)
    } catch (error) {
        next(error);
    }
});

module.exports = router;