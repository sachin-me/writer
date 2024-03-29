const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const userController = require("../controller/userController");
const { isLoggedIn } = require("../modules/loggedInUser");

// Post APIs starts here
router.get("/posts", postController.getPost);
router.post("/posts", postController.addPost);
router.get("/post/:id", postController.getSinglePost);
router.get("/post/:id/delete", isLoggedIn, postController.deletePost);
router.put("/post/:id/edit", isLoggedIn, postController.updatePost);
// Post APIs ends here

// User APIs starts here
router.post("/signup", userController.create);
router.post("/login", userController.loginUser);
router.get("/profile", userController.loggedInUser);
router.get("/logout", userController.logoutUser);
// User APIs ends here
module.exports = router;
