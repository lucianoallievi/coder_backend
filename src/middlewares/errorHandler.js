function errorHandler(error, req, res, next) {
  console.log(error);
  return res.json({
    statusCode: error.statusCode || 500,
    message: `${req.method} ${req.url} ${req.message}`,
  });
}

export default errorHandler;
