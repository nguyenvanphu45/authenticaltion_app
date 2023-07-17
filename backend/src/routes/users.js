const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/usersController');

router.get('/:id', usersController.getUser);
router.post('/login', usersController.login);
router.post('/register', usersController.register);
router.put('/edit/:id', usersController.update)

module.exports = router;
