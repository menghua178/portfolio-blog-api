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
    const project = await Project.findById(req.params.id);
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
      user: req.user._id, // 从 protect 中间件获取
    });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    next(error);
  }
};

// ... PUT 和 DELETE 方法类似，需要添加 protect 中间件和权限检查

module.exports = { getProjects, getProjectById, createProject /*, updateProject, deleteProject */ };