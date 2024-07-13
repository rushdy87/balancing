const express = require('express');

const u52TanksRoutes = require('./tanks');
const blendingRoutes = require('./blending');
const CrudeOilRoutes = require('./crude-oil');

// /api/u52/
const router = express.Router();

router.use('/tanks', u52TanksRoutes);
router.use('/blending', blendingRoutes);
router.use('/crude', CrudeOilRoutes);

module.exports = router;
