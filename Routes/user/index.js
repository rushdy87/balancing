const express = require('express');
const {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/user');

// /api/users/
const router = express.Router();

router.get('/:id', getUserById);
router.get('/', getAllUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
