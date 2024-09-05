const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentController');
const User = require('../models/User');
// Create a new comment
router.post('/', commentsController.createComment);

// Get comments by target ID
router.get('/target/:targetId', commentsController.getCommentsByTargetId);

// Add a reply to a comment
router.post('/:commentId/replies', commentsController.addReplyToComment);
router.get('/comments/user/:userId', commentsController.getCommentsByUserId);

// Update a comment
router.put('/:commentId', commentsController.updateComment);

// Update a reply
router.put('/:commentId/replies/:replyId', commentsController.updateReply);

// Delete a comment (soft delete)
router.delete('/:commentId', commentsController.deleteComment);

// Delete a reply
router.delete('/:commentId/replies/:replyId', commentsController.deleteReply);
router.get('/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ name: user.name }); // Assuming 'name' is a field in your User model
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
  });
  

module.exports = router;
