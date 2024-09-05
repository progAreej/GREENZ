// // // controllers/recipeSharingController.js
// // const RecipeSharing = require('../models/Recipe');
// // const Recipe = require('../models/Recipe');
// // const User = require('../models/User');

// // exports.shareRecipe = async (req, res) => {
// //   try {
// //     const { recipeId, sharedWith, message } = req.body;
// //     const sharedBy = req.user._id; // Ensure req.user is set by your authentication middleware

// //     // Validate input
// //     if (!recipeId || !sharedWith || !message) {
// //       return res.status(400).json({ message: 'Recipe ID, User ID, and message are required' });
// //     }

// //     const recipe = await Recipe.findById(recipeId);
// //     const user = await User.findById(sharedWith);

// //     // Check if recipe and user exist
// //     if (!recipe) {
// //       return res.status(404).json({ message: 'Recipe not found' });
// //     }
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     // Create a new RecipeSharing document
// //     const newShare = new RecipeSharing({
// //       recipeId,
// //       sharedBy,
// //       sharedWith,
// //       message
// //     });

// //     await newShare.save();
// //     res.status(201).json({ message: 'Recipe shared successfully', data: newShare });
// //   } catch (error) {
// //     console.error('Error sharing recipe:', error);
// //     res.status(500).json({ message: 'Server Error', error });
// //   }
// // };

// // exports.getUserList = async (req, res) => {
// //   try {
// //     const users = await User.find({}, 'name email'); // Return only necessary fields
// //     res.status(200).json(users);
// //   } catch (error) {
// //     console.error('Error fetching users:', error);
// //     res.status(500).json({ message: 'Server Error', error });
// //   }
// // };


// const RecipeSharing = require('../models/Sharing'); // Correct import
// const Recipe = require('../models/Recipe');
// const User = require('../models/User');

// exports.shareRecipe = async (req, res) => {
//   try {
//     const { recipeId, sharedWith, message } = req.body;
//     const sharedBy = req.user._id; // Ensure req.user is set by your authentication middleware

//     // Validate input
//     if (!recipeId || !sharedWith || !message) {
//       return res.status(400).json({ message: 'Recipe ID, User ID, and message are required' });
//     }

//     const recipe = await Recipe.findById(recipeId);
//     const user = await User.findById(sharedWith);

//     // Check if recipe and user exist
//     if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//     }
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Create a new RecipeSharing document
//     const newShare = new RecipeSharing({
//       recipeId,
//       sharedBy,
//       sharedWith,
//       message
//     });

//     await newShare.save();
//     res.status(201).json({ message: 'Recipe shared successfully', data: newShare });
//   } catch (error) {
//     console.error('Error sharing recipe:', error);
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };

// exports.getUserList = async (req, res) => {
//   try {
//     const users = await User.find({}, 'name email'); // Return only necessary fields
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };
const Sharing = require('../models/Sharing');
const User = require('../models/User');

exports.shareRecipe = async (req, res) => {
  try {
    const { recipeId, sharedBy, sharedWith, message } = req.body;

    // Validate input
    if (!recipeId || !sharedBy || !sharedWith) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if both users exist
    const [sharingUser, receivingUser] = await Promise.all([
      User.findById(sharedBy),
      User.findById(sharedWith)
    ]);

    if (!sharingUser || !receivingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new sharing record
    const newSharing = new Sharing({
      recipeId,
      sharedBy,
      sharedWith,
      message
    });

    await newSharing.save();

    res.status(201).json({ message: 'Recipe shared successfully', sharing: newSharing });
  } catch (error) {
    console.error('Error sharing recipe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

