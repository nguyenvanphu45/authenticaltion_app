const express = require('express');
const middlewareController = require('../app/controllers/middlewareController');
const router = express.Router();

const authController = require('../app/controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh', authController.requestRefreshToken);
router.post('/logout', middlewareController.verifyToken, authController.logout);

module.exports = router;
