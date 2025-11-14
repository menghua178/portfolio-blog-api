const mongoose = require('mongoose');

        const blogPostSchema = mongoose.Schema(
          {
            title: { type: String, required: true },
            content: { type: String, required: true },
            author: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
              ref: 'User',
            },
          },
          {
            timestamps: true,
          }
        );

        const BlogPost = mongoose.model('BlogPost', blogPostSchema);
        module.exports = BlogPost;