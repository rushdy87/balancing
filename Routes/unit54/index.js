const express = require('express');

const u54StorageRoutes = require('./storage');

// /api/u52/
const router = express.Router();

router.use('/store', u54StorageRoutes);

module.exports = router;
