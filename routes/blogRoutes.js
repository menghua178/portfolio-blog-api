// routes/blogRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getCommentsForPost,
  createComment,
} = require('../controllers/blogPostController');

// 文章路由
router.route('/').get(getBlogPosts).post(protect, createBlogPost);

router
  .route('/:id')
  .get(getBlogPostById)
  .put(protect, updateBlogPost)
  .delete(protect, deleteBlogPost);

// 评论路由 (嵌套路由)
// 注意: 我们使用 :postId 来清晰地表示这是文章的ID
router
  .route('/:postId/comments')
  .get(getCommentsForPost)
  .post(protect, createComment);

module.exports = router;