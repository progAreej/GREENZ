const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/dabash');

router.post('/register', register);


module.exports = router;