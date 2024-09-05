


const Recipe = require('../models/Recipe');

// Get recipes with optional filters and pagination
exports.getRecipes = async (req, res) => {
  try {
    const { page = 1, limit = 8, search = '', title = '' } = req.query;
    const filters = {};

    // Add search filter for ingredients
    if (search) {
      filters.ingredients = { $regex: search, $options: 'i' };  // Case-insensitive search for ingredients
    }

    // Add title filter
    if (title) {
      filters.name = { $regex: title, $options: 'i' };  // Case-insensitive search for title
    }

    // Fetch recipes with pagination
    const recipes = await Recipe.find(filters)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Count total number of recipes
    const totalRecipes = await Recipe.countDocuments(filters);

    res.json({
      recipes,
      totalRecipes,
      totalPages: Math.ceil(totalRecipes / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);  // All fields including `photos` are returned by default
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
  const { chefId, name, category, ingredients, instructions, cookingTime, cuisine, dietaryRestrictions, categories, photos, nutrition } = req.body;
  try {
    const newRecipe = new Recipe({
      chefId, name, category, ingredients, instructions, cookingTime, cuisine, dietaryRestrictions, categories, photos, nutrition
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);  // All fields including `photos` are returned
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a recipe by ID
exports.updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(updatedRecipe);  // All fields including `photos` are returned by default
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// const getNutritionFacts = async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id).select('nutrition');
//     if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//     }
//     res.json(recipe.nutrition);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   getRecipeById,
//   updateNutritionFacts,
//   addNutritionFacts,
//   getNutritionFacts // Add the new function here
// };