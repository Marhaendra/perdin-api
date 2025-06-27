const AuthContorller = require('../controller/auth');

const express = require('express');

const router = express.Router();

//CREATE - POST
router.post('/register', AuthContorller.registerUser);

//LOGIN - POST
router.post('/login', AuthContorller.loginUser);

module.exports = router;