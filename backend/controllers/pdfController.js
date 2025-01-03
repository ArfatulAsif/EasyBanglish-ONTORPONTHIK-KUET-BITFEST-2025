const pdfMiddleware = require("../middlewars/pdfMiddleware")

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
            { banglaTitle: { contains: searchText, mode: 'insensitive' } },
            { banglishTitle: { contains: searchText, mode: 'insensitive' } },
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