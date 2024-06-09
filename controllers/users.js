const bcryptjs = require('bcryptjs');
const { User } = require('../models');
const { handleError } = require('../utils');

// Get User by ID
exports.getUserById = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const user = await User.findByPk(user_id, {
      attributes: ['id', 'username', 'name', 'role', 'unit', 'group'],
    });
    if (!user) {
      return handleError(next, 'User not found', 404);
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user', error);
    return handleError(
      next,
      'Something went wrong, could not retrieve the user right now.'
    );
  }
};

// Get All Users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'name', 'role', 'unit', 'group'],
    });
    if (!users || users.length === 0) {
      return handleError(next, 'No users found', 404);
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users', error);
    return handleError(
      next,
      'Something went wrong, could not retrieve the users right now.'
    );
  }
};

// Create User
exports.createUser = async (req, res, next) => {
  const { username, password, name, role, unit, group } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return handleError(
        next,
        'User already exists, please choose another username.',
        409
      );
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const createdUser = await User.create({
      username,
      password: hashedPassword,
      name,
      role,
      unit,
      group,
    });

    if (!createdUser) {
      return handleError(next, 'Error occurred during user creation.', 500);
    }

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user', error);
    return handleError(
      next,
      'Something went wrong, could not create the user right now.'
    );
  }
};

// Update User
exports.updateUser = async (req, res, next) => {
  const { user_id } = req.params;
  const data = req.body;

  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return handleError(next, 'User not found', 404);
    }

    await user.update(data);
    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user', error);
    return handleError(
      next,
      'Something went wrong, could not update the user right now.'
    );
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return handleError(next, 'User not found', 404);
    }

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user', error);
    return handleError(
      next,
      'Something went wrong, could not delete the user right now.'
    );
  }
};
