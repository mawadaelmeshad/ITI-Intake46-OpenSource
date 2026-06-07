const ApiError = require('../utils/apiError');

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: false });
    if (error) {
      const message = error.details.map((d) => d.message).join(', ');
      return next(new ApiError(400, message));
    }
    next();
  };
}

module.exports = validate;
