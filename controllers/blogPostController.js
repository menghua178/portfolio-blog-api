const BlogPost = require('../models/blogPostModel');
const Comment = require('../models/commentModel');

// @desc    获取所有博客文章
// @route   GET /api/blog
// @access  Public
const getBlogPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find({}).populate('author', 'username');
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// @desc    获取单篇博客文章及其评论
// @route   GET /api/blog/:id
// @access  Public
const getBlogPostById = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!post) {
      res.status(404);
      throw new Error('文章未找到');
    }
    const comments = await Comment.find({ post: req.params.id }).populate('author', 'username');
    res.json({ post, comments });
  } catch (error) {
    next(error);
  }
};

// @desc    创建博客文章
// @route   POST /api/blog
// @access  Private
const createBlogPost = async (req, res, next) => {
  // ... 实现创建逻辑, author 为 req.user._id
};

// @desc    更新博客文章
// @route   PUT /api/blog/:id
// @access  Private/Authorized
const updateBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      res.status(404);
      throw new Error('文章未找到');
    }
    // 授权逻辑：检查登录用户是否为文章作者
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('用户未授权');
    }
    // ... 更新逻辑 ...
  } catch (error) {
    next(error);
  }
};

// ... DELETE 和评论相关的方法

module.exports = { getBlogPosts, getBlogPostById, updateBlogPost /* ...其他导出 */ };