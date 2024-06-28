const { HttpError } = require('../models');

const handleError = (next, message, statusCode = 500) => {
  return next(new HttpError(message, statusCode));
};

module.exports = { handleError };
