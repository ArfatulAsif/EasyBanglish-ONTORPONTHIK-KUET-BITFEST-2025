const express = require('express');
const pdfController = require('../controllers/pdfController')

const router = express.Router();
router.post('/make',pdfController.generatePdf)

module.exports = router;