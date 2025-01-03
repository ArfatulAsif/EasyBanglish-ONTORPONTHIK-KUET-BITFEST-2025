const fs = require("fs");
const path = require("path");
const htmlToPdf = require("html-pdf");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pdfMiddleware = {
    /**
     * Convert HTML content to PDF, upload it to Cloudinary, and return the URL.
     * @param {string} htmlContent - The HTML content to convert to PDF.
     * @returns {Promise<string>} - The URL of the uploaded PDF in Cloudinary.
     */
    generatePdf: async (htmlContent) => {
      try {
        // Define the path to save the temporary PDF
        const uploadsDir = path.join(__dirname, 'uploads');
        const pdfFilePath = path.join(uploadsDir, 'temp_pdf.pdf');
  
        // Check if the 'uploads' directory exists, if not, create it
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir);
        }
  
        // Convert HTML to PDF using html-pdf library
        await new Promise((resolve, reject) => {
          htmlToPdf.create(htmlContent).toFile(pdfFilePath, (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          });
        });
  
        // Upload the generated PDF to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(pdfFilePath, {
          resource_type: "raw", // Use raw type for non-image files like PDF
        });
        console.log(uploadResult);
  
        // Delete the local PDF file after uploading to Cloudinary
        //fs.unlinkSync(pdfFilePath);
  
        // Return the URL of the uploaded PDF
        return uploadResult.url;
      } catch (error) {
        console.error("Error generating PDF:", error);
        throw new Error("Failed to generate or upload PDF");
      }
    },
  };
  
  module.exports = pdfMiddleware;