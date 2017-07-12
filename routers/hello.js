const express = require('express');
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   Hello:
 *     type: object
 *     properties:
 *       content:
 *         type: string
 */

/**
 *  @swagger
 *  /Hello:
 *    get:
 *      tags:
 *        - test
 *      summary: just hello world
 *      security:
 *        - Bearer: []
 *      responses:
 *        200:
 *          description: just hello world.
 *          schema:
 *              $ref: '#/definitions/Hello'
 *        401:
 *          $ref: '#/responses/401'
 */
router.get('/', require('../routes/hello').hello);

module.exports = router;