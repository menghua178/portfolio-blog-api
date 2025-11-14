const express = require('express');
    const dotenv = require('dotenv');
    const helmet = require('helmet');
    const cors = require('cors');
    const connectDB = require('./config/db');
    const userRoutes = require('./routes/userRoutes');
    // 加载环境变量
    dotenv.config();

    // 连接数据库
    connectDB();

    const app = express();

    // 中间件
    app.use(helmet()); // 设置安全的HTTP头
    app.use(cors()); // 允许跨域
    app.use(express.json()); // 解析JSON请求体
    app.use('/api/projects', require('./routes/projectRoutes'));
    app.use('/api/contact', require('./routes/messageRoutes'));
    app.use('/api/blog', require('./routes/blogRoutes'));

    // 基础路由
    app.get('/', (req, res) => {
      res.send('API 正在运行...');
    });
    
    app.use('/api/users', userRoutes);
    const { notFound, errorHandler } = require('./middleware/errorMiddleware');

    app.use(notFound);
    app.use(errorHandler);
    // TODO: 引入路由文件
    
    // TODO: 引入错误处理中间件

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`服务器运行在 ${process.env.NODE_ENV} 模式, 端口号 ${PORT}`));