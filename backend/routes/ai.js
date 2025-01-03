const express = require('express');
const multer = require('multer');
const aiController = require('../controllers/aiController'); // Import the AI controller
const { tokenValidate } = require('../middlewars/tokenValidate');

const router = express.Router();

// Multer setup for handling image uploads
const upload = multer({ dest: 'uploads/' });

// Define routes
router.post('/analyze-image', upload.single('image'), aiController.analyzeImage);
router.post('/generate-image', aiController.generateImage);
router.post('/generate-pdf', tokenValidate('user'), aiController.generateJSON);
router.put('/update-pdf', tokenValidate('user'), aiController.updateBanglaText);
router.post('/generate-voice', aiController.getVoice);
router.post('/generate-text',aiController.getText);
router.post('/generate-first',aiController.generateJSONFirstMessage);
router.post('/pdf-search',aiController.getTextPdf);
router.post('/content-convert',aiController.generateTextSpellCheck);

module.exports = router;
