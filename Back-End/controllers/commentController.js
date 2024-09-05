

const Comment = require('../models/Comments');
const mongoose = require('mongoose');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { userId, type, targetId, comment } = req.body;

    if (!userId || !type || !targetId || !comment) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newComment = new Comment({
      userId,
      type,
      targetId,
      comment
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};

// Get comments by target ID
exports.getCommentsByTargetId = async (req, res) => {
  try {
    const targetId = req.params.targetId;

    if (!targetId) {
      return res.status(400).json({ message: 'Target ID is required' });
    }

    const comments = await Comment.find({ targetId });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

// Add a reply to a comment
exports.addReplyToComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { userId, reply } = req.body;

    if (!commentId || !userId || !reply) {
      return res.status(400).json({ message: 'Comment ID, user ID, and reply text are required' });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $push: {
          replies: {
            userId,
            reply,
            createdAt: new Date()
          }
        }
      },
      { new: true } // Return the updated document
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error('Error posting reply:', error);
    res.status(500).json({ message: 'Error posting reply', error: error.message });
  }
};

// Delete a comment (soft delete) with ownership check
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body; // Ensure the userId is sent in the request body

    if (!commentId || !userId) {
      return res.status(400).json({ message: 'Comment ID and user ID are required' });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user requesting the deletion is the owner of the comment
    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this comment' });
    }

    comment.isDeleted = true;
    await comment.save();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
};

// Delete a reply with ownership check
exports.deleteReply = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { replyId, userId } = req.body; // Ensure replyId and userId are sent in the request body

    if (!commentId || !replyId || !userId) {
      return res.status(400).json({ message: 'Comment ID, reply ID, and user ID are required' });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const reply = comment.replies.id(replyId);

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    // Check if the user requesting the deletion is the owner of the reply
    if (reply.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this reply' });
    }

    reply.remove(); // Remove the reply from the replies array
    await comment.save(); // Save the updated comment

    res.status(200).json({ message: 'Reply deleted successfully' });
  } catch (error) {
    console.error('Error deleting reply:', error);
    res.status(500).json({ message: 'Error deleting reply', error: error.message });
  }
};
// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, newComment } = req.body; // Ensure the userId and newComment are sent in the request body

    if (!commentId || !userId || !newComment) {
      return res.status(400).json({ message: 'Comment ID, user ID, and new comment text are required' });
    }

    // Find the comment to update
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user requesting the update is the owner of the comment
    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this comment' });
    }

    // Update the comment text
    comment.comment = newComment;
    comment.updatedAt = new Date(); // Update timestamp
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Error updating comment', error: error.message });
  }
};
// Update a reply in a comment
exports.updateReply = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;
    const { userId, newReply } = req.body; // Ensure the userId and newReply are sent in the request body

    if (!commentId || !replyId || !userId || !newReply) {
      return res.status(400).json({ message: 'Comment ID, reply ID, user ID, and new reply text are required' });
    }

    // Find the comment that contains the reply
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Find the reply in the comment's replies array
    const reply = comment.replies.id(replyId);

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    // Check if the user requesting the update is the owner of the reply
    if (reply.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this reply' });
    }

    // Update the reply text
    reply.reply = newReply;
    reply.updatedAt = new Date(); // Update timestamp
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error updating reply:', error);
    res.status(500).json({ message: 'Error updating reply', error: error.message });
  }
};

exports.getCommentsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const comments = await Comment.find({ userId }).populate('replies.userId');
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

