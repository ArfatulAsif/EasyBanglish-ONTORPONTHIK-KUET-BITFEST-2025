const express = require('express');
const { initiatePayment, confirm, failed } = require('../controllers/paymentController');

const router = express.Router();

// POST route for submitting feedback
router.post('/initiate/:id', initiatePayment);

router.post('/confirm-payment/:id', confirm)

router.post('/failed-payment', failed)

module.exports = router;