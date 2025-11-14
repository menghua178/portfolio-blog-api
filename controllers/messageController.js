const Message = require('../models/messageModel');

// @desc    创建新消息
// @route   POST /api/contact
// @access  Public
const createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    const savedMessage = await newMessage.save();
    res.status(201).json({ message: '消息已成功发送!', data: savedMessage });
  } catch (error) {
    next(error);
  }
};

module.exports = { createMessage };