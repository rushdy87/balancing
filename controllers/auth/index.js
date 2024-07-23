const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { handleError } = require('../../utils');

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return handleError(
        next,
        'Could not identify user, credenials seem to be wrong',
        401
      );
    }

    let isValidPassword = bcryptjs.compareSync(password, user.password);

    if (!isValidPassword) {
      return handleError(
        next,
        'Could not identify user, credenials seem to be wrong',
        401
      );
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: 60 * 15,
    });

    res.status(200).json({
      userId: user.id,
      username: user.username,
      role: user.role,
      unit: user.unit,
      token,
    });
  } catch (error) {
    console.error('Error fetching user', error);
    return handleError(
      next,
      'Something went wrong, could not retrieve the user right now.'
    );
  }
};
