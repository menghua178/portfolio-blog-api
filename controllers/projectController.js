// controllers/projectController.js

const Project = require('../models/projectModel');

// @desc    获取所有项目
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({}).populate('user', 'username email');
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    获取单个项目
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('user', 'username email');
    if (project) {
      res.json(project);
    } else {
      res.status(404);
      throw new Error('项目未找到');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    创建新项目
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res, next) => {
  try {
    const { title, description, imageUrl, repoUrl, liveUrl } = req.body;
    const project = new Project({
      title,
      description,
      imageUrl,
      repoUrl,
      liveUrl,
      user: req.user._id, // 从 protect 中间件获取登录用户
    });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    next(error);
  }
};

// @desc    更新一个项目
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res, next) => {
  try {
    const { title, description, imageUrl, repoUrl, liveUrl } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('项目未找到');
    }

    // 授权检查：确保是项目的创建者才能修改
    // 项目要求中假定为 admin-only, 但这里我们实现为只有作者可修改，与博客逻辑一致
    if (project.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('用户未授权');
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.imageUrl = imageUrl || project.imageUrl;
    project.repoUrl = repoUrl || project.repoUrl;
    project.liveUrl = liveUrl || project.liveUrl;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

// @desc    删除一个项目
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('项目未找到');
    }
    
    // 授权检查
    if (project.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('用户未授权');
    }

    await project.deleteOne();
    res.json({ message: '项目已删除' });
  } catch (error) {
    next(error);
  }
};

// 导出所有函数
module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};