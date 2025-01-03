const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new collaboration with a single user
const createCollaboration = async (req, res) => {
  try {
    const { userId, content } = req.body;

    const collaboration = await prisma.collaboration.create({
      data: {
        content,
        users: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json({ success: true, collaboration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add another user to an existing collaboration
const addUserToCollaboration = async (req, res) => {
  try {
    const { collaborationId, userId } = req.body;

    const collaboration = await prisma.collaboration.update({
      where: { id: collaborationId },
      data: {
        users: {
          connect: { id: userId },
        },
      },
    });

    res.status(200).json({ success: true, collaboration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a collaboration
const deleteCollaboration = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.collaboration.delete({
      where: { id: parseInt(id, 10) },
    });

    res.status(200).json({ success: true, message: 'Collaboration deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update collaboration content
const updateCollaborationContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const collaboration = await prisma.collaboration.update({
      where: { id: parseInt(id, 10) },
      data: { content },
    });

    res.status(200).json({ success: true, collaboration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Find all collaborations for a specific user
const getCollaborationsByUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const collaborations = await prisma.collaboration.findMany({
        where: {
          users: {
            some: {
              id: parseInt(userId),
            },
          },
        },
        include: {
          users: true, // Include user details in the response
        },
      });
  
      res.status(200).json({ success: true, collaborations });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  const getCollaborationContentById = async (req, res) => {
    try {
      const { collabId } = req.params;
  
      const collaboration = await prisma.collaboration.findUnique({
        where: {
          id: parseInt(collabId, 10),
        },
        select: {
          id: true,
          content: true,
        },
      });
  
      if (!collaboration) {
        return res.status(404).json({ success: false, message: "Collaboration not found" });
      }
  
      res.status(200).json({ success: true, collaboration });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

module.exports = {
  createCollaboration,
  addUserToCollaboration,
  deleteCollaboration,
  updateCollaborationContent,
  getCollaborationsByUser,
  getCollaborationContentById,
};
