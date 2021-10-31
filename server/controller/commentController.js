const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {
  create: async function (req, res) {
    const { postId } = req.params;
    const { userId } = req.session;
    const { text } = req.body;
    if (!text) {
      return res.json({
        error: "*Textis required.",
      });
    }
    var newComment = new Comment({
      text,
      user: userId,
      post: postId,
    });
    newComment.save(async (err, comment) => {
      if (err) {
        return res.json({
          error: "Not able to create comment. Please try after sometimes.",
        });
      } else {
        await Post.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              comments: comment._id,
            },
          }
        );
        return res.json({
          message: "Comment created successfully",
          comment,
        });
      }
    });
  },
  commentList: async function (req, res) {
    const { postId } = req.params;
    const comments = await Comment.findOne({ post: postId }).sort({
      created: -1,
    });

    return res.json({
      message: "Comments getting successfully",
      comments,
    });
  },
};
