// routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// 公开路由获取所有项目，私有路由创建新项目
router.route('/').get(getProjects).post(protect, createProject);

// 公开路由获取单个项目，私有路由更新和删除项目
router
  .route('/:id')
  .get(getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;