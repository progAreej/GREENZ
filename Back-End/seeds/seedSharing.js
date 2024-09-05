const mongoose = require('mongoose');
const connectDB = require('../config/db'); // Adjust path if necessary
const User = require('../models/User'); // Adjust path if necessary
const Recipe = require('../models/Recipe'); // Adjust path if necessary
const RecipeSharing = require('../models/Sharing'); // Adjust path if necessary

const seedSharing = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log('Database connection established');

    // Fetch users and recipes from the database
    const users = await User.find();
    const recipes = await Recipe.find();

    if (users.length === 0 || recipes.length === 0) {
      console.log('No users or recipes found. Please add some data to the database first.');
      return;
    }

    // Example recipe sharing
    const Sharings = [
      {
        recipeId: recipes[0]._id,
        sharedBy: users[0]._id,
        sharedWith: users[1]._id,
        message: 'I thought you’d love this chocolate cake recipe!'
      },
      {
        recipeId: recipes[1]._id,
        sharedBy: users[1]._id,
        sharedWith: users[0]._id,
        message: 'Here’s a great pasta salad recipe I tried.'
      },
      {
        recipeId: recipes[0]._id,
        sharedBy: users[2]._id,
        sharedWith: users[0]._id,
        message: 'This chocolate cake recipe is amazing. Give it a try!'
      },
      {
        recipeId: recipes[1]._id,
        sharedBy: users[0]._id,
        sharedWith: users[2]._id,
        message: 'I know you like pasta, so you should try this salad recipe!'
      }
    ];

    // Clear existing recipe sharings
    await RecipeSharing.deleteMany({});

    // Insert new recipe sharings
    const docs = await RecipeSharing.insertMany(Sharings);
    console.log('Recipe sharings inserted:', docs);

    await mongoose.connection.close(); // Close connection after seeding
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close(); // Close connection on error
  }
};

seedSharing();
