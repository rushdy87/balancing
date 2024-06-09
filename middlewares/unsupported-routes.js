const HttpError = require('../models/http-error');

exports.unsupportedRoutes = (req, res, next) => {
  next(new HttpError('Could not find this route!', 404));
};
