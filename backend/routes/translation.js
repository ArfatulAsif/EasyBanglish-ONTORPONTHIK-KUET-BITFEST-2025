const express = require('express');
const translationController = require('../controllers/translationController');
const { tokenValidate } = require('../middlewars/tokenValidate');

const router = express.Router();

// Route to add Banglish and Bangla translation
router.post('/add', tokenValidate('user'), translationController.addTranslation);

// Route to fetch all verified translations
router.get('/verified', tokenValidate('admin'), translationController.showVerifiedTranslations);

// Route to verify a translation
router.post('/verify', tokenValidate('admin'), translationController.verifyTranslation);

router.post('/delete',tokenValidate('admin'), translationController.deleteTranslation)

module.exports = router;
