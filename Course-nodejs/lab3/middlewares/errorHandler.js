function errorHandler(err, req, res, next) {
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({ status: 'error', message: err.message });
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({ status: 'error', message: 'Invalid ID format' });
  }

  // Duplicate key (MongoServerError code 11000)
  if (err.code && err.code === 11000) {
    const key = Object.keys(err.keyValue || {}).join(', ');
    return res.status(409).json({ status: 'error', message: `Duplicate value for: ${key}` });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ status: 'error', message });
}

module.exports = errorHandler;
