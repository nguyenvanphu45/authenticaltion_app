const express = require('express');
const middlewareController = require('../app/controllers/middlewareController');
const router = express.Router();

const usersController = require('../app/controllers/usersController');

router.get('/:id', middlewareController.verifyToken, usersController.getUser);
router.put('/edit/:id', middlewareController.verifyToken, usersController.update);

module.exports = router;
