const express = require('express');
const { registerToProgram, verifyRegistration, cancelRegistration } = require('../controllers/registrationController');

const router = express.Router();

/**
 * @openapi
 * paths:
 *  /registrations/:
 *    post:
 *      summary: Register to a program
 *      tags:
 *        - Registration
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                programId:
 *                  type: string
 *                userId:
 *                  type: string
 *      responses:
 *        '201':
 *          description: Successful registration
 *        '500':
 *          description: Internal server error
 */
router.post('/', registerToProgram);

/**
 * @openapi
 * paths:
 *  /registrations/{id}/verify:
 *    put:
 *      summary: Verify registration
 *      tags:
 *        - Registration
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Registration ID
 *      responses:
 *        '200':
 *          description: Registration verified
 *        '500':
 *          description: Internal server error
 */
router.put('/:id/verify', verifyRegistration);

/**
 * @openapi
 * paths:
 *  /registrations/{id}/cancel:
 *    put:
 *      summary: Cancel registration
 *      tags:
 *        - Registration
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Registration ID
 *      responses:
 *        '200':
 *          description: Registration canceled
 *        '500':
 *          description: Internal server error
 */
router.put('/:id/cancel', cancelRegistration);

module.exports = router;
