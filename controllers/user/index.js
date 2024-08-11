const bcryptjs = require('bcryptjs');
const { User } = require('../../models');
const { checkAuthorization, handleError } = require('../../utils');

const excludeAttributes = ['password', 'createdAt', 'updatedAt'];

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userData } = req;
    checkAuthorization(userData, null, next);

    const user = await User.findByPk(id, {
      attributes: { exclude: excludeAttributes },
    });
    if (!user)
      return handleError(next, 'Could not find any user with this id.', 404);

    return res.status(200).json(user);
  } catch (error) {
    return handleError(next, `Error fetching user. ${error.message}`, 500);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const { userData } = req;
    checkAuthorization(userData, null, next);

    const users = await User.findAll({
      attributes: { exclude: excludeAttributes },
    });
    if (!users || users.length === 0)
      return handleError(next, 'No users found.', 404);

    return res.status(200).json(users);
  } catch (error) {
    return handleError(next, `Error fetching users. ${error.message}`, 500);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = req.body;
    const { userData } = req;
    checkAuthorization(userData, null, next);

    const existingUser = await User.findOne({
      where: { username: user.username },
    });
    if (existingUser) return handleError(next, 'User already exists.', 409);

    user.password = bcryptjs.hashSync(user.password, 10);
    const createdUser = await User.create(user);

    return res
      .status(201)
      .json({ message: `User ${user.username} created successfully.` });
  } catch (error) {
    return handleError(next, `Error creating user. ${error.message}`, 500);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { userData } = req;
    checkAuthorization(userData, null, next);

    const user = await User.findByPk(id, {
      attributes: { exclude: excludeAttributes },
    });
    if (!user)
      return handleError(next, 'Could not find any user with this id.', 404);

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && user[key] !== undefined) {
        user[key] = data[key];
      }
    });

    await user.save();
    return res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    return handleError(next, `Error updating user. ${error.message}`, 500);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userData } = req;
    checkAuthorization(userData, null, next);

    const user = await User.findByPk(id, {
      attributes: { exclude: excludeAttributes },
    });
    if (!user)
      return handleError(next, 'Could not find any user with this id.', 404);

    const deletionResult = await User.destroy({ where: { id } });
    if (deletionResult !== 1)
      return handleError(next, 'Error deleting user.', 500);

    return res.status(204).json({ message: 'User deleted successfully.' });
  } catch (error) {
    return handleError(next, `Error deleting user. ${error.message}`, 500);
  }
};
