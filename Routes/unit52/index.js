const express = require('express');

const u52TanksRoutes = require('./tanks');
const blendingRoutes = require('./blending');

// /api/u52/
const router = express.Router();

router.use('/tanks', u52TanksRoutes);
router.use('/blending', blendingRoutes);

module.exports = router;
