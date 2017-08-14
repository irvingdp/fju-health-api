const express = require('express');
const DomainPackage = require('../domain/package');

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