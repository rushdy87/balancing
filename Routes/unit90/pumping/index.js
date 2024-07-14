const express = require('express');

const PGPumpingRoutes = require('./premium-gasoline-pumping');
const RGPumpingRoutes = require('./regular-gasoline-pumping');

// /api/u90/pumping
const router = express.Router();

router.use('/pg', PGPumpingRoutes);
router.use('/rg', RGPumpingRoutes);

module.exports = router;
