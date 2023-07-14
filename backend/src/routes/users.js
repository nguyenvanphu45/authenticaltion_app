const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/usersController');

router.get('/', usersController.getUser);
router.post('/login', usersController.login);
router.post('/register', usersController.register);

module.exports = router;
