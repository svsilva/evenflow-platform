const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Rota para o webhook do Stripe
router.post('/', webhookController.handleStripeWebhook);

module.exports = router;