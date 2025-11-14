const User = require('../models/userModel');
    const generateToken = require('../utils/generateToken');

    // @desc    注册新用户
    // @route   POST /api/users/register
    // @access  Public
    const registerUser = async (req, res, next) => {
      try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
          res.status(400);
          throw new Error('用户已存在');
        }

        const user = await User.create({
          username,
          email,
          password, // 密码会在 pre-save hook 中自动加密
        });

        if (user) {
          res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
          });
        } else {
          res.status(400);
          throw new Error('无效的用户数据');
        }
      } catch (error) {
        next(error); // 将错误传递给错误处理中间件
      }
    };

    // @desc    认证用户 & 获取token
    // @route   POST /api/users/login
    // @access  Public
    const loginUser = async (req, res, next) => {
      try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
          res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
          });
        } else {
          res.status(401); // 401 表示未授权
          throw new Error('无效的邮箱或密码');
        }
      } catch (error) {
        next(error);
      }
    };

    module.exports = { registerUser, loginUser };