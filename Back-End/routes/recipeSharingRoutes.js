// const express = require('express');
// const router = express.Router();
// const recipeSharingController = require('../controllers/recipeSharingController');
// const auth = require('../Middlewares/authU');

// // Protect the share route with the auth middleware
// router.post('/share', auth, recipeSharingController.shareRecipe);
// router.get('/users', auth, recipeSharingController.getUserList);

// module.exports = router;


const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeSharingController');

router.post('/share', recipeController.shareRecipe);

module.exports = router;
