const express = require('express');

const u90TanksRoutes = require('./u90Tanks');

// /api/u90
const router = express.Router();

router.use('/tanks', u90TanksRoutes);

module.exports = router;
