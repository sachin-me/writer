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
          post,
        });
      }
    });
  },

  getPost: (req, res) => {
    Post.find({}, (err, posts) => {
      if (err) {
        return res.json({
          error: "Unable to fetch posts.",
        });
      }
      res.json({ posts });
    });
  },

  deletePost: (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id, (err, post) => {
      if (err) {
        return res.json({
          error: "Unable to delete post.",
        });
      } else {
        return res.json({
          message: "Post deleted."
        })
      }
    });
  },

  updatePost: (req, res) => {
    const id = req.params.id;
    const { title, bodyName, description } = req.body;
    if (!title || !bodyName || !description) {
      return res.json({
        error: "*Title, body, and description are required.",
      });
    }
    Post.findByIdAndUpdate({ _id: id }, req.body, { new: true }, (err) => {
      if (err) {
        return res.json({
          error: "Unable to update post.",
        });
      } else {
        return res.json({
          message: "Post updated.",
        });
      }
    });
  },

  getSinglePost: (req, res) => {
    const id = req.params.id;
    Post.findById(id, (err, post) => {
      if (err) {
        return res.json({
          error: "Unable to fetch post.",
        });
      }
      return res.json({
        message: "Post found.",
        post,
      });
    });
  },
};
