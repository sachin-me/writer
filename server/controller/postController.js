var Post = require("../models/Post");

module.exports = {
  addPost: (req, res) => {
    const { userId } = req.session;
    const { title, bodyName, description, tags } = req.body;

    if (!title || !bodyName || !description) {
      return res.json({
        error: "*Title, body, and description are required.",
      });
    }
    var newPost = new Post({
      title,
      description,
      bodyName,
      tags,
      user: userId,
    });
    newPost.save((err, post) => {
      if (err) {
        return res.json({
          error: "Not able to create post. Please try after sometimes.",
        });
      } else {
        return res.json({
          message: "Post created successfully",
          post
        });
      }
    });
  },

  getPost: (req, res) => {
    Post.find({}, (err, posts) => {
      if (err) throw err;
      let userId = req.user ? req.user._id : null;
      let username = req.user ? req.user.name : null;
      res.json({ posts, userId: userId, username: username });
    });
  },

  deletePost: (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id, (err, posts) => {
      if (err) throw err;
      Post.find({}, (err, posts) => {
        if (err) throw err;
        res.json(posts);
      });
    });
  },

  updatePost: (req, res) => {
    const id = req.params.id;
    Post.findByIdAndUpdate({ _id: id }, req.body, { new: true }, (err) => {
      if (err) {
        throw err;
      } else {
        Post.find({}, (err, posts) => {
          if (err) throw err;
          res.json(posts);
        });
      }
    });
  },

  getSinglePost: (req, res) => {
    const id = req.params.id;
    Post.findById(id, (err, post) => {
      if (err) throw err;
      res.json({
        post,
        user: req.user,
      });
    });
  },
};
