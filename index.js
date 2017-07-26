"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const config = require("./config");
const Auth = require("./utils/auth");
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const authentication = require('express-authentication');
// for parsing application/json
app.use(bodyParser.json());

// allow CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// authenticate requests via header then inject current user to req.authentication
// this middleware gets called on every request
app.use(function (req, res, next) {
    let authentication = Auth.auth(req);
    if(authentication) {
        req.authenticated = true;
        req.authentication = authentication;
    } else {
        req.authenticated = false;
    }
    next();
});

app.get('/user/profile', authentication.required(), (req, res, next) => {
    res.status(200).json({auth: req.authentication})
});

app.use('/', require("./routers/unauth"));

app.use(function (err, req, res, next) {  // do not remove next as the method signature matters...
    let status, error = {};

    if(err.status === 401) {
        status = 401;
        error = {
            message: "access denied"
        }
    } else if (!err.status){
        status = 500;
        error = {
            message: err.message,
            stack: err.stack,
        }
    } else {
        status = err.status;
        error = {
            message: err.message,
            stack: err.stack,
        }
    }
    res.status(status).json(error);
});

/**
 * @swagger
 * tags:
 *   - name:
 *       test
 *     description:
 *       test
 *
 * responses:
 *   401:
 *     description: Invalid token
 *     schema:
 *       $ref: '#/definitions/Error'
 *
 * definitions:
 *   Error:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *       stack:
 *         type: string
 */
//start: Initialize swagger-jsdoc -> returns validated swagger spec in json format
var options = {
    swaggerDefinition: {
        info: {                    // This is the same info property in the Swagger 2.0 spec.
            title: 'FJU Health API',
            version: '0.0.1'
        },
        schemes: ["http", "https"],
        host: config.HOST_NAME
    },
    apis: ['./index.js', './routers/*'], // Path to the API docs
};
var swaggerSpec = swaggerJSDoc(options);
app.get('/api', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
//end: Initialize swagger


var port = process.argv[2] || 3002;

app.listen(port, function () {
    console.log('FJU Health API listening on port ' + port);
});


