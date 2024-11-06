// loginRoute.js
const express = require('express');
const router = express.Router();
const userlogin = require('../middlewares/authMiddleware');

// User management routes with authentication and authorization middleware
router.post('/login', userlogin.loginUser);

module.exports = router;
