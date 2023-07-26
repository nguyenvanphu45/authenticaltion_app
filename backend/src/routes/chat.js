const express = require('express');
const middleware = require('../app/middleware/authentication');
const router = express.Router();

const chatController = require('../app/controllers/chat.controller');

router.get('/', middleware.verifyToken, chatController.findAllGroup)
router.post('/create', middleware.verifyToken, chatController.create);
router.get('/member', middleware.verifyToken, chatController.fetchMember);

module.exports = router;
