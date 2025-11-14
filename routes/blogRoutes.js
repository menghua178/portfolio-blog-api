const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
// ... 导入控制器方法

// 文章路由
router.route('/').get(/* getBlogPosts */).post(protect, /* createBlogPost */);
router.route('/:id').get(/* getBlogPostById */).put(protect, /* updateBlogPost */).delete(protect, /* deleteBlogPost */);

// 评论路由 (嵌套路由)
router.route('/:postId/comments').get(/* getCommentsForPost */).post(protect, /* createComment */);

module.exports = router;