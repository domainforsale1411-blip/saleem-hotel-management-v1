const express = require('express');
const router = express.Router();
const { createHotel, getMyHotels } = require('../controllers/hotel.controller');
const { verifyToken, isAdmin } = require('../middleware/authJwt');
const checkSubscription = require('../middleware/checkSubscription');

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Hotel management endpoints
 */

/**
 * @swagger
 * /hotels:
 *   post:
 *     summary: Create a new hotel
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nameEn
 *             properties:
 *               nameEn:
 *                 type: string
 *               nameAr:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Hotel created successfully
 *       403:
 *         description: Subscription expired or limit reached
 *       500:
 *         description: Server error
 */
router.post('/', [verifyToken, isAdmin, checkSubscription], createHotel);

/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: Get all hotels for the authenticated user
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nameEn:
 *                     type: string
 *       403:
 *         description: Subscription expired
 *       500:
 *         description: Server error
 */
router.get('/', [verifyToken, checkSubscription], getMyHotels);

module.exports = router;
