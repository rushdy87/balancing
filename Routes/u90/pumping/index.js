const express = require('express');

const pGPumpingRoutes = require('./PGPumping');
const rGPumpingRoutes = require('./RGPumping');

// /api/u90/pumping
const router = express.Router();

router.use('/pg', pGPumpingRoutes);
router.use('/rg', rGPumpingRoutes);

module.exports = router;
