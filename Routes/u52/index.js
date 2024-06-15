const express = require('express');

const blendingRoutes = require('./blending');
const u52TanksRoutes = require('./u52Tanks');

// /api/52/
const router = express.Router();

router.use('/blending', blendingRoutes);
// router.use('/tanks', u52TanksRoutes);

module.exports = router;
