const express = require('express');
const pdfController = require('../controllers/pdfController')
const { tokenValidate } = require('../middlewars/tokenValidate');

const router = express.Router();
router.get("/all",tokenValidate('user'), pdfController.getPublicAndPrivatePDFs); // All public + user private PDFs
router.get("/user",tokenValidate('user'), pdfController.getUserPDFs); // User's all PDFs
router.get("/users", pdfController.getUserPublicPDFs); // User's all PDFs
router.get("/single/:id", tokenValidate('user'), pdfController.getPDFById); // Get PDF by ID
router.put("/change", tokenValidate('user'), pdfController.updatePdfVisibility);
router.post('/search', pdfController.searchPdfs);
router.delete("/delete/:id", tokenValidate('user'), pdfController.deletePdfById);
router.post("/create",pdfController.createPdfFromHtml);

module.exports = router;