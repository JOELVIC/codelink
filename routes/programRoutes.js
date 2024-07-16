const express = require('express');
const { addProgram, getPrograms, deleteProgram } = require('../controllers/programController');

const router = express.Router();

/**
 * @swagger
 * /programs:
 *   post:
 *     summary: Add a new program
 *     tags: [Programs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - type
 *               - image
 *               - duration
 *               - courses
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               image:
 *                 type: string
 *               duration:
 *                 type: string
 *               courses:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     duration:
 *                       type: string
 *                     resources:
 *                       type: array
 *                       items:
 *                         type: string
 *     responses:
 *       201:
 *         description: Program added successfully
 */
router.post('/', addProgram);

/**
 * @swagger
 * /programs:
 *   get:
 *     summary: Get all programs
 *     tags: [Programs]
 *     responses:
 *       200:
 *         description: List of all programs
 */
router.get('/', getPrograms);

/**
 * @swagger
 * /programs/{id}:
 *   delete:
 *     summary: Delete a program
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The program ID
 *     responses:
 *       200:
 *         description: Program deleted successfully
 */
router.delete('/:id', deleteProgram);

module.exports = router;
