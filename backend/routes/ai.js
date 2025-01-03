const express = require('express');
const multer = require('multer');
const aiController = require('../controllers/aiController'); // Import the AI controller

const router = express.Router();

// Multer setup for handling image uploads
const upload = multer({ dest: 'uploads/' });

// Define routes
router.post('/analyze-image', upload.single('image'), aiController.analyzeImage);
router.post('/generate-image', aiController.generateImage);
router.post('/generate-json', aiController.generateJSON);
router.post('/generate-voice', aiController.getVoice);
router.post('/generate-text',aiController.getText);
router.post('/generate-first',aiController.generateJSONFirstMessage);

module.exports = router;
