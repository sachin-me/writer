const express = require('express');
const router = express.Router()
const controller = require('../controller/postController')
const userController = require('../controller/userController');
const isLoggedIn = require('../routes/index');
const isUser = isLoggedIn.isLoggedIn;

router.get('/', controller.getPost);
router.post('/post', isUser ,controller.addPost);
router.get('/post/:id', controller.getSinglePost);
router.get('/post/:id/delete', isUser ,controller.deletePost);
router.put('/post/:id/edit', isUser ,controller.updatePost);
// router.get('/logout', userController.logoutUser);


module.exports = router;