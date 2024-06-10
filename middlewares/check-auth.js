const jwt = require('jsonwebtoken');

const { handleError } = require('../utils');
const { User } = require('../models');

exports.checkAuth = async (req, res, next) => {
  // Its a browser behavior for creating HTTP request
  // basically anything but get request, The browser automaticlly
  // send 'OPTIONS' request before it send the actual request you
  // went to send
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    // const token = req.headers.authorization.split(' ')[1]; // {authorization: 'Bearer TOKEN'}

    // if (!token) {
    //   return handleError(next, 'Authentication faild!', 401);
    // }

    // const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY); // {userId}
    // const user = await User.findByPk(decodedToken.userId, {
    //   attributes: ['id', 'role', 'unit'],
    // });

    // if (!user) {
    //   return handleError(next, 'Authentication failed!', 401);
    // }

    // req.userData = {
    //   id: user.id,
    //   role: user.role,
    //   unit: user.unit,
    // };

    req.userData = {
      id: 'username1',
      role: '1',
      unit: 'u90',
    };

    next();
  } catch (error) {
    console.error('Authentication failed!', error);
    return handleError(next, 'Authentication failed!', 401);
  }
};

//req.headers is automaticlly provided by 'express', it's a js object

// NOTES about auth in front-end:
// 1. The login api response with object contain {userId, token}
// 2. We can implement a (login/logout) function depend on the token.
// if there is token login, if not logout..
// 3.it's important to save a token, for anothe requests.
// 5. When sending a request, add an "authorization" and set it to `Bearer ${token}` to header of request.
