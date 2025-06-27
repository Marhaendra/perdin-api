const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middleware/auth');
const UsersController = require('../controller/users');

router.get('/', authenticate, authorizeRoles('DIVISI-SDM'), UsersController.getAllUsers);

router.get('/profile', authenticate, UsersController.getUserProfile);

module.exports = router;