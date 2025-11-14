const jwt  = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 获取 token, 'Bearer TOKEN_STRING'
      token = req.headers.authorization.split(' ')[1];

      // 验证 token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 获取用户信息 (不包括密码), 并附加到 req 对象
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        res.status(401);
        throw new Error('用户未找到');
      }

      next(); // 继续执行下一个中间件或路由处理器
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('未授权，token 验证失败');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('未授权，没有提供 token');
  }
};

module.exports = { protect };