const mongoose = require('mongoose');

        const commentSchema = mongoose.Schema(
          {
            body: { type: String, required: true },
            author: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
              ref: 'User',
            },
            post: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
              ref: 'BlogPost',
            },
          },
          {
            timestamps: true,
          }
        );

        const Comment = mongoose.model('Comment', commentSchema);
        module.exports = Comment;