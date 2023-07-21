const express = require('express');
const middleware = require('../app/middleware/authentication');
const router = express.Router();

const authController = require('../app/controllers/auth.controller');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh', authController.requestRefreshToken);
router.post('/logout', middleware.verifyToken, authController.logout);

module.exports = router;
