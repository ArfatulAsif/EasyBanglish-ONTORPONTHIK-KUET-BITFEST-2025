const pdfMiddleware = require("../middlewars/pdfMiddleware")
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  exports.createPdfFromHtml = async (req, res) => {
    const { htmlContent, fileName, pdf_id } = req.body;
    const content = JSON.parse(htmlContent)
    try {
        // Validate inputs
        if (!content || !fileName || !pdf_id) {
            return res.status(400).json({ error: 'HTML content, file name, and pdf_id are required' });
        }

        // Concatenate pdf_id with the file name
        const pdfFileName = `${pdf_id}-${fileName}.pdf`;

        // Launch Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set HTML content
        await page.setContent(content);

        // Generate PDF file path
        const pdfFolderPath = path.join(__dirname, '../pdfs');
        if (!fs.existsSync(pdfFolderPath)) {
            fs.mkdirSync(pdfFolderPath); // Create folder if not exists
        }

        // Full path for the generated PDF
        const pdfFilePath = path.join(pdfFolderPath, pdfFileName);

        // Generate PDF
        await page.pdf({
            path: pdfFilePath,
            format: 'A4',
        });

        await browser.close();

        // Respond with success and the URL for the generated PDF
        const pdfUrl = `/pdfs/${pdfFileName}`;

        res.status(201).json({
            message: 'PDF created successfully',
            url: pdfUrl, // The URL for accessing the PDF
        });
    } catch (error) {
        console.error('Error creating PDF:', error.message);
        res.status(500).json({ error: 'Failed to create PDF' });
    }
};

// Get all public PDFs and user's private PDFs
exports.getPublicAndPrivatePDFs = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const pdfs = await prisma.pdf.findMany({
        where: {
          OR: [
            { visibility: "public" },
            { AND: [{ visibility: "private" }, { userId }] }
          ]
        },
        include: {
          user: true, // Include the related user data
        },
      });
  
      return res.status(200).json({ pdfs });
    } catch (error) {
      console.error("Error fetching PDFs:", error.message);
      return res.status(500).json({ error: "Failed to fetch PDFs" });
    }
  };

// Get all PDFs for the logged-in user
exports.getUserPDFs = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const userPDFs = await prisma.pdf.findMany({
        where: { userId },
        include: {
          user: true, // Include the related user data
        },
      });
  
      return res.status(200).json({ userPDFs });
    } catch (error) {
      console.error("Error fetching user PDFs:", error.message);
      return res.status(500).json({ error: "Failed to fetch user PDFs" });
    }
  };

// Get all PDFs for the logged-in user
exports.getUserPublicPDFs = async (req, res) => {
    const userId = req.query.userId;
    //console.log(userId)
    try {
      const userPDFs = await prisma.pdf.findMany({
        where: { userId: parseInt(userId) },
        include: {
          user: true, // Include the related user data
        },
      });
  
      return res.status(200).json({ userPDFs });
    } catch (error) {
      console.error("Error fetching user PDFs:", error.message);
      return res.status(500).json({ error: "Failed to fetch user PDFs" });
    }
  };

// Get unique PDF content by ID
exports.getPDFById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const pdf = await prisma.pdf.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          userId: true,
          titleBangla: true,
          titleBanglish: true,
          captionBangla: true,
          captionBanglish: true,
          time: true,
          tags: true,
          visibility: true,
          banglaText: true,
          mainContent: true
        },
        include: {
          user: true, // Include the related user data
        },
      });
  
      if (!pdf) {
        return res.status(404).json({ error: "PDF not found" }); // 404 Not Found
      }
  
      // Check access permissions
      if (pdf.visibility === "private" && pdf.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized access to this PDF" }); // 403 Forbidden
      }
  
      return res.status(200).json({ pdf });
    } catch (error) {
      console.error("Error fetching PDF by ID:", error.message);
      return res.status(500).json({ error: "Failed to fetch PDF" });
    }
  };
  
  exports.updatePdfVisibility = async (req, res) => {
    const { pdfId, visibility } = req.body; // Destructure pdfId and visibility from request body
  
    try {
      // Check if both pdfId and visibility are provided
      if (!pdfId || !visibility) {
        return res.status(400).json({ error: 'PDF ID and visibility are required' });
      }
  
      // Check if the visibility is valid (public or private)
      const validVisibilities = ['public', 'private'];
      if (!validVisibilities.includes(visibility)) {
        return res.status(400).json({ error: 'Invalid visibility value. It must be either "public" or "private".' });
      }
  
      // Update the visibility in the database
      const updatedPdf = await prisma.pdf.update({
        where: { id: pdfId }, // Use the PDF id to find the record
        data: { visibility },  // Set the new visibility
      });
  
      return res.status(200).json({ message: 'Visibility updated successfully', updatedPdf });
    } catch (error) {
      console.error('Error updating PDF visibility:', error.message);
      res.status(500).json({ error: 'Failed to update PDF visibility' });
    }
  };

exports.searchPdfs = async (req, res) => {
    const { text } = req.body; // Extract search text from the body
  
    try {
      if (!text) {
        return res.status(400).json({ error: 'Search text is required' });
      }
  
      // Convert the search text to lowercase for case-insensitive search
      const searchText = text.toLowerCase();
  
      // Perform a search across multiple fields (captionBangla, captionBanglish, banglaText, banglaTitle, banglishTitle)
      const searchResults = await prisma.pdf.findMany({
        where: {
          OR: [
            { captionBangla: { contains: searchText, mode: 'insensitive' } },
            { captionBanglish: { contains: searchText, mode: 'insensitive' } },
            { banglaText: { contains: searchText, mode: 'insensitive' } },
            { titleBangla: { contains: searchText, mode: 'insensitive' } },
            { titleBanglish: { contains: searchText, mode: 'insensitive' } },
          ],
        },
        include: {
          user: true, // Include the related user data
        },
      });
  
      return res.status(200).json(searchResults);
    } catch (error) {
      console.error('Error searching PDFs:', error.message);
      res.status(500).json({ error: 'Failed to search PDFs' });
    }
  };

  exports.deletePdfById = async (req, res) => {
    const { id } = req.params;  // Get the PDF ID from the URL

    try {
        // Find the PDF by ID
        const pdf = await prisma.pdf.findUnique({
            where: { id: parseInt(id) },
        });

        if (!pdf) {
            return res.status(404).json({ error: 'PDF not found' });  // If no PDF is found
        }

        // Check if the PDF belongs to the current user (optional: only allow deleting PDFs that belong to the user)
        if (pdf.userId !== req.user.id) {
            return res.status(403).json({ error: 'You do not have permission to delete this PDF' });  // Unauthorized
        }

        // Delete the PDF
        await prisma.pdf.delete({
            where: { id: parseInt(id) },
        });

        // Respond with success message
        res.status(200).json({ message: 'PDF deleted successfully' });
    } catch (error) {
        console.error('Error deleting PDF:', error.message);
        res.status(500).json({ error: 'Failed to delete PDF' });
    }
};
