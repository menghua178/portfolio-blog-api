// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 使用 mongoose.connect 连接到你的 MongoDB Atlas URI
    // process.env.MONGO_URI 会从你的 .env 文件中读取数据库连接字符串
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // 如果连接成功，在控制台打印成功信息
    console.log(`MongoDB 已连接: ${conn.connection.host}`);
  } catch (error) {
    // 如果连接过程中发生错误，捕获错误并在控制台打印
    // **这里是修正后的一行**
    console.error(`错误: ${error.message}`);
    
    // 退出 Node.js 进程，并返回状态码 1，表示因失败而退出
    process.exit(1); 
  }
};

module.exports = connectDB;