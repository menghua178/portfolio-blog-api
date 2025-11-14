const express = require('express');
const router = express.Router();
const { createMessage } = require('../controllers/messageController');

router.post('/', createMessage); // 直接映射到 /api/contact

module.exports = router;