const express = require('express');

const AuthControllers = require('../../controllers/auth');

const router = express.Router();

// /api/auth

router.post('/login', AuthControllers.login);

module.exports = router;
