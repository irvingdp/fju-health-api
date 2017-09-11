"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const config = require("./config");
const log4js = require('log4js');
const addRequestId = require('express-request-id')();
const Auth = require("./utils/auth");
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const authentication = require('express-authentication');
const {maskFieldReplacer} = require('./utils/jsonStringifyReplacer');
const path = require('path');

// initialize Knex
const Model = require('objection').Model;
const Knex = require('knex');
const knexConfig = require('./gen/knex/knexfile');
let knex = Knex(knexConfig.development);
Model.knex(knex);

const scheduler = require('./scheduler');
const Locale = require('./locale');

app.use(bodyParser({limit: '25mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

{
    /* Block for logging setup */
    log4js.configure({
        appenders: {
            console: {
                type: 'console',
            }
        },
        categories: {default: {appenders: ['console'], level: 'debug'}}
    });
}
const logger = log4js.getLogger();
{
    /* Block for further logging setup */
    app.use(addRequestId); // Create uuid for a request, can be retrieved by using req.id
    app.use(log4js.connectLogger(logger, {
        level: log4js.levels.DEBUG, format: (req, res, format) => {

            return format(`[${req.id}]:remote-addr - :method :url :status`);
        }
    }));
    app.use(function (req, res, next) {
        //- Log request body, but don't log password (using maskFieldReplacer)
        logger.debug(`[${req.id}] - ${JSON.stringify(req.body, maskFieldReplacer.bind(this, ["password"]))}`);
        next();
    });
    if (knexConfig.debug) {
        //- Use logger instead of knex default console.log
        knex.on('query', function (queryData) {
            logger.debug(queryData);
        });
    }
}

// allow CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");

    Locale.setLocale(req.headers.locale);

    // intercept OPTIONS method to avoid preflight requiring authentication
    if ('OPTIONS' == req.method)
        res.send(200);
    else
        next();
});

app.use('/', require("./routers/public")); //none auth path

// add auth middleware for auth request exclude "./routers/public"
app.use(function (req, res, next) {
    let authentication = Auth.auth(req.headers.authorization);
    if (authentication) {
        req.authenticated = true;
        req.authentication = authentication; //user identify: email
    } else {
        req.authenticated = false;
    }
    next();
});

//just for check token is valid or not.
app.post('/isValidToken', authentication.required(), (req, res) => {
    res.status(200).json({});
});

app.use('/profile', authentication.required(), require("./routers/profile"));

app.use('/reservation', authentication.required(), require("./routers/reservation"));

app.use('/package', authentication.required(), require("./routers/package"));

app.use('/admin/public', require("./routers/admin"));

app.use('/admin', authentication.required(), require("./routers/reservation")); // TODO: Jeff, need to authenticate 'admin user' vs 'normal user'

app.use('/dashboard', authentication.required(), require("./routers/dashboard"));

app.use('/device', authentication.required(), require("./routers/device"));

//error handler middleware
app.use(function (err, req, res, next) {  // do not remove next as the method signature matters...
    let status, error = {};

    if (err.status === 401 && !err.message) {
        status = 401;
        error = {
            message: "access denied"
        }
    } else if (!err.status) {
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
    logger.error(`[${req.id}] (return status: ${status}) ${JSON.stringify(error)}`);
    logger.error(error.stack);
    res.status(status).json(error);
});

// allow loading of html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


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

var port = process.argv[2] || 3001;

app.listen(port, function () {
    console.log('FJU Health API listening on port ' + port);
});

scheduler.startAll();
