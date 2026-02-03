const express = require('express');
const router = express.Router();
const { processMessage } = require('../controllers/chat.controller');
const { verifyToken } = require('../middleware/authJwt');
const checkSubscription = require('../middleware/checkSubscription');

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: AI Chat Assistant endpoints
 */

/**
 * @swagger
 * /chat/message:
 *   post:
 *     summary: Send a message to the AI assistant
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *               language:
 *                 type: string
 *                 enum: [en, ar]
 *                 default: en
 *     responses:
 *       200:
 *         description: AI response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       403:
 *         description: Subscription expired
 *       500:
 *         description: Server error
 */
router.post('/message', [verifyToken, checkSubscription], processMessage);

module.exports = router;
