// const express = require('express');
// const router = express.Router();
// const recipeController = require('../controllers/recipeController');

// router.get('/', recipeController.getRecipes); // Get all recipes with optional filters
// router.get('/:id', recipeController.getRecipeById); // Get a single recipe by ID
// router.post('/', recipeController.createRecipe); // Create a new recipe
// router.put('/:id', recipeController.updateRecipe); // Update a recipe by ID
// router.delete('/:id', recipeController.deleteRecipe); // Delete a recipe by ID

// module.exports = router;


const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Route for getting recipes with optional filters
router.get('/', recipeController.getRecipes);

// Other routes
router.get('/:id', recipeController.getRecipeById);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);
// router.get('/:id/nutrition', recipeController.getNutritionFacts); // Add this route


module.exports = router;
