const ApiError = require('../utils/apiError');

function restrictTo(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Please log in first.'));
    }
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, `You do not have permission. Required role: ${roles.join(' or ')}`));
    }
    next();
  };
}

module.exports = restrictTo;
