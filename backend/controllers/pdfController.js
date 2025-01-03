const pdfMiddleware = require("../middlewars/pdfMiddleware")

exports.generatePdf = async(req, res)=>{
    try {
        // Extract HTML content from the request body
        //const { htmlContent } = req.body
        const htmlContent = '"<p><strong style=\\"font-size: 32px;\\">amar bajarer list</strong></p><p><strong style=\\"font-size: 32px;\\"><br></strong></p><ol><li><strong style=\\"font-size: 16px;\\">alu</strong></li><li><strong style=\\"font-size: 16px;\\">peyaj</strong></li><li><strong style=\\"font-size: 16px;\\">komola</strong></li></ol><p><br></p><p><br></p>"';
    
        if (!htmlContent) {
          return res.status(400).json({ error: "HTML content is required" });
        }
    
        // Call the pdfMiddleware to generate the PDF and upload to Cloudinary
        const pdfUrl = await pdfMiddleware.generatePdf(JSON.parse(htmlContent));
    
        // Respond with the URL of the uploaded PDF
        return res.status(200).json({ url: pdfUrl });
      } catch (error) {
        console.error("Error in generating PDF:", error);
        return res.status(500).json({ error: "Failed to generate PDF" });
    }
}