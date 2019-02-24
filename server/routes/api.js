const express = require('express');
const router = express.Router()
const controller = require('../controller/postController')

router.get('/', controller.getPost);
router.post('/post', controller.addPost);
router.get('/post/:id', controller.getSinglePost);
router.get('/post/:id/delete', controller.deletePost);
router.put('/post/:id/edit', controller.updatePost);


module.exports = router;