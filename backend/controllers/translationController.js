const openaiMiddleware = require('../middlewars/openaiMiddleware'); // Import the OpenAI middleware

exports.addTranslation = async (req, res) => {
    const { banglish, bangla } = req.body;
  
    // Check for required fields
    if (!banglish || !bangla) {
      return res.status(400).json({ error: 'Both Banglish and Bangla texts are required' });
    }
  
    try {
      // Save the translation data to the database
      const newTranslation = await prisma.userTranslation.create({
        data: {
          userId: req.user.id, // Extracted from the authenticated user
          banglish,
          bangla,
          verify: false, // Default verify status is false
        },
      });
  
      res.status(201).json({ message: 'Translation data successfully added', data: newTranslation });
    } catch (error) {
      console.error('Error adding translation data:', error.message);
      res.status(500).json({ error: 'Failed to add translation data' });
    }
  };

  exports.showVerifiedTranslations = async (req, res) => {
    //console.log("came")
    try {
      // Fetch all verified translations (verify = true)
      const verifiedTranslations = await prisma.userTranslation.findMany({
        where: { verify: false },
        include: {
          user: true, // Optional: Include user details
        },
      });
      //console.log(verifiedTranslations)
      res.status(200).json({ data: verifiedTranslations });
    } catch (error) {
      console.error('Error fetching verified translations:', error.message);
      res.status(500).json({ error: 'Failed to fetch verified translations' });
    }
  };

  exports.verifyTranslation = async (req, res) => {
    const { translationId } = req.body;
  
    // Check if translationId is provided
    if (!translationId) {
      return res.status(400).json({ error: 'Translation ID is required' });
    }
  
    try {
      // Check if the translation exists and if the verify status is already true
      const translation = await prisma.userTranslation.findUnique({
        where: { id: translationId },
      });
  
      if (!translation) {
        return res.status(404).json({ error: 'Translation not found' });
      }
  
      if (translation.verify) {
        return res.status(400).json({ error: 'Translation is already verified' });
      }
  
      // Update the verify status to true
      const updatedTranslation = await prisma.userTranslation.update({
        where: { id: translationId },
        data: { verify: true },
      });

      const acknowledgment = await openaiMiddleware.trainBanglishToBangla(translation.banglish, translation.bangla)
  
      res.status(200).json({ message: 'Translation successfully verified', data: updatedTranslation, acknowledgment: acknowledgment });
    } catch (error) {
      console.error('Error verifying translation:', error.message);
      res.status(500).json({ error: 'Failed to verify translation' });
    }
  };

  exports.deleteTranslation = async (req, res) => {
    
    const { translationId } = req.body;
  
    // Check if translationId is provided
    if (!translationId) {
      return res.status(400).json({ error: 'Translation ID is required' });
    }
  
    try {
      // Check if the translation exists
      const translation = await prisma.userTranslation.findUnique({
        where: { id: translationId },
      });
  
      if (!translation) {
        return res.status(404).json({ error: 'Translation not found' });
      }
  
      // Delete the translation
      const deletedTranslation = await prisma.userTranslation.delete({
        where: { id: translationId },
      });
  
      res.status(200).json({ message: 'Translation successfully deleted', data: deletedTranslation });
    } catch (error) {
      console.error('Error deleting translation:', error.message);
      res.status(500).json({ error: 'Failed to delete translation' });
    }
  };
  