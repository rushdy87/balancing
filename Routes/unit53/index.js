const express = require('express');

const u53TanksRoutes = require('./tanks');

// /api/u52/
const router = express.Router();

router.use('/tanks', u53TanksRoutes);

module.exports = router;
