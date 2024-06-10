const { unsupportedRoutes } = require('./unsupported-routes');
const { errorHandling } = require('./error-handling.js');
const { checkAuth } = require('./check-auth.js');

module.exports = { unsupportedRoutes, errorHandling, checkAuth };
