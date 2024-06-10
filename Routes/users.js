const express = require('express');

const UsersControllers = require('../controllers/users');
const { checkAuth } = require('../middlewares');

const router = express.Router();

// /api/users/....

router.get('/:user_id', UsersControllers.getUserById);

router.get('/', UsersControllers.getAllUsers);

router.post('/', UsersControllers.createUser);

router.patch('/:user_id', UsersControllers.updateUser);

router.delete('/:user_id', UsersControllers.deleteUser);

module.exports = router;
