const jwt = require('jsonwebtoken');

const { handleError } = require('../utils');

exports.checkAuth = (req, res, next) => {
  // Its a browser behavior for creating HTTP request
  // basically anything but get request, The browser automaticlly
  // send 'OPTIONS' request before it send the actual request you
  // went to send
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // {authorization: 'Bearer TOKEN'}

    if (!token) {
      return handleError(next, 'Authentication faild!', 401);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY); // return { userId }
    req.userData = {
      id: decodedToken.userId,
    };

    next();
  } catch (error) {
    console.error('Authentication faild!');
    return handleError(
      next,
      'Something went wrong, could not retrieve the authentication right now.'
    );
  }
};

//req.headers is automaticlly provided by 'express', it's a js object

// NOTES about auth in front-end:
// 1. The login api response with object contain {userId, token}
// 2. We can implement a (login/logout) function depend on the token.
// if there is token login, if not logout..
// 3.it's important to save a token, for anothe requests.
// 5. When sending a request, add an "authorization" and set it to `Bearer ${token}` to header of request.
