const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = mongoose.Schema({
  title: String,
  bodyName: String,
  description: String,
  tags: [String]
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;