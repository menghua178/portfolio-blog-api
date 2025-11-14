// 404 Not Found 中间件
const notFound = (req, res, next) => {
  const error = new Error(`未找到 - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// 中央错误处理中间件
const errorHandler = (err, req, res, next) => {
  // 如果状态码是200, 可能是代码中抛出了错误但没有设置状态码, 将其设为500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // 只在开发环境中显示堆栈信息
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };