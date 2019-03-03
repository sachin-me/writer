var Post = require('../models/Post')

module.exports = {

  addPost: (req, res) => {
    console.log(req.user, 'inside add post controller');
    var newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      bodyName: req.body.bodyName,
      tags: req.body.tags,
      user: req.user
    })
    newPost.save((err, posts) => {
      if (err) throw Error('invalid post');
      Post.find({}, ((err, posts) => {
        if (err) throw err;
        res.json(posts);
      }))
    })
  },
  
  getPost: (req, res) => {
    Post.find({}, ((err, posts) => {
      if (err) throw err;
      let userId = req.user ? req.user._id : null;
      let username = req.user ? req.user.name : null;
      res.json({ posts, userId: userId, username: username });
    }))
  },

  deletePost: (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id, (err, posts) => {
      if (err) throw err;
      Post.find({}, ((err, posts) => {
        if (err) throw err;
        res.json(posts);
      }))
    })
  },

  updatePost: (req, res) => {
    const id = req.params.id;
    Post.findByIdAndUpdate({_id:id}, req.body, { new: true }, (err) => {
      if (err) {throw err}
      else {
        Post.find({}, (err, posts) => {
          if (err) throw err
          res.json(posts);
        })
      }
    })
  },

  getSinglePost: (req, res) => {
    const id = req.params.id;
    Post.findById(id, (err, post) => {
      if (err) throw err;
      res.json({
        post,
        user: req.user
      });
    })
  }
}