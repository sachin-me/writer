const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = mongoose.Schema({
  title: String,
  bodyName: String,
  description: String,
  tags: [String],
  user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;