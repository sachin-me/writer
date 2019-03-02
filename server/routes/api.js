const express = require('express');
const router = express.Router()
const controller = require('../controller/postController')
const userController = require('../controller/userController');

router.get('/', controller.getPost);
router.post('/post', controller.addPost);
router.get('/post/:id', controller.getSinglePost);
router.get('/post/:id/delete', controller.deletePost);
router.put('/post/:id/edit', controller.updatePost);
// router.get('/logout', userController.logoutUser);


module.exports = router;