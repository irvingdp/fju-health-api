"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const config = require("./config");
const helper = require("./utils/helper");
const app = express();
var swaggerJSDoc = require('swagger-jsdoc');

app.use(bodyParser.json()); // for parsing application/json

var options = {
    swaggerDefinition: {
        info: {                    // This is the same info property in the Swagger 2.0 spec.
            title: 'FJU Health API',
            version: '1.0.0'
        },
        schemes: ["http", "https"],
        host: config.HOST_NAME,
    },
    apis: ['./index.js', './routers/*'], // Path to the API docs
};
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var swaggerSpec = swaggerJSDoc(options);
app.get('/api', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/hello/', require("./routers/hello"));

app.use(function (err, req, res, next) { // do not remove next as the method signature matters...
    let error = helper.errorHandle(err);
    res.status(error.status).json({message: error.message, stack: error.stack});
});

var port = process.argv[2] || 3001;

app.listen(port, function () {
    console.log('FJU Health API listening on port ' + port);
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
