const express = require('express');
const {
  createCollaboration,
  addUserToCollaboration,
  deleteCollaboration,
  updateCollaborationContent,
  getCollaborationsByUser,
  getCollaborationContentById,
} = require('../controllers/collaborationController');

const router = express.Router();

// Routes
router.post('/collaborations', createCollaboration); // Create collaboration with one user
router.post('/collaborations/add-user', addUserToCollaboration); // Add another user to collaboration
router.delete('/collaborations/:id', deleteCollaboration); // Delete collaboration
router.put('/collaborations/:id', updateCollaborationContent); // Update collaboration content
router.get('/collaborations/user/:userId', getCollaborationsByUser);
router.get('/collaborations/:collabId', getCollaborationContentById);

module.exports = router;
