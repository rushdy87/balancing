const express = require('express');

const u54StorageRoutes = require('./u54Storage');

// /api/54/
const router = express.Router();

router.use('/store', u54StorageRoutes);

module.exports = router;
