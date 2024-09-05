const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Recipe Sharing Schema
const SharingSchema = new Schema({
  recipeId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Recipe', // Reference to the Recipe model
    required: true 
  },
  sharedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User model (the user sharing the recipe)
    required: true 
  },
  sharedWith: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User model (the user receiving the recipe)
    required: true 
  },
  sharedAt: { 
    type: Date, 
    default: Date.now // Date when the recipe was shared
  },
  message: { 
    type: String // Optional message that the user might include when sharing
  }
}, {
  timestamps: true // Automatically manage `createdAt` and `updatedAt`
});

// Create the RecipeSharing model using the schema
const Sharing = mongoose.model('Sharing', SharingSchema, 'Sharings');

module.exports = Sharing;
