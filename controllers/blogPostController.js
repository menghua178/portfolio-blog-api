// controllers/blogPostController.js

const BlogPost = require('../models/blogPostModel');
const Comment = require('../models/commentModel');

// @desc    获取所有博客文章
// @route   GET /api/blog
// @access  Public
const getBlogPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find({}).sort({ createdAt: -1 }).populate('author', 'username');
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
    // 同时获取这篇文章下的所有评论
    const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: 1 }).populate('author', 'username');
    res.json({ post, comments });
  } catch (error) {
    next(error);
  }
};

// @desc    创建博客文章
// @route   POST /api/blog
// @access  Private
const createBlogPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400);
        throw new Error('标题和内容不能为空');
    }
    const post = new BlogPost({
      title,
      content,
      author: req.user._id,
    });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    next(error);
  }
};

// @desc    更新博客文章
// @route   PUT /api/blog/:id
// @access  Private/Authorized
const updateBlogPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
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
    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// @desc    删除博客文章
// @route   DELETE /api/blog/:id
// @access  Private/Authorized
const deleteBlogPost = async (req, res, next) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            res.status(404);
            throw new Error('文章未找到');
        }
        // 授权检查
        if (post.author.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('用户未授权');
        }

        // 重要：删除文章前，先删除其下的所有评论
        await Comment.deleteMany({ post: post._id });
        await post.deleteOne();

        res.json({ message: '文章及其所有评论已删除' });
    } catch (error) {
        next(error);
    }
};

// --- 评论相关控制器 ---

// @desc    获取一篇文章下的所有评论
// @route   GET /api/blog/:postId/comments
// @access  Public
const getCommentsForPost = async (req, res, next) => {
    try {
        const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');
        res.json(comments);
    } catch (error) {
        next(error);
    }
};

// @desc    为文章创建新评论
// @route   POST /api/blog/:postId/comments
// @access  Private
const createComment = async (req, res, next) => {
    try {
        const { body } = req.body;
        if (!body) {
            res.status(400);
            throw new Error('评论内容不能为空');
        }
        const comment = new Comment({
            body,
            author: req.user._id,
            post: req.params.postId,
        });
        const createdComment = await comment.save();
        res.status(201).json(createdComment);
    } catch (error) {
        next(error);
    }
};

// 导出所有与博客相关的函数
module.exports = {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getCommentsForPost,
  createComment,
};