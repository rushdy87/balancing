const express = require('express');

const u90TanksRoutes = require('./tanks');

// /api/u52/
const router = express.Router();

router.use('/tanks', u90TanksRoutes);

module.exports = router;
