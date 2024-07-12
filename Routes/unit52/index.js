const express = require('express');

const u52TanksRoutes = require('./tanks');

// /api/u52/
const router = express.Router();

router.use('/tanks', u52TanksRoutes);

module.exports = router;
