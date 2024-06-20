const express = require('express');

const pGPumpingRoutes = require('./PGPumping');
const rGPumpingRoutes = require('./RGPumping');
const dieselPumpingRoutes = require('./dieselPumping');

// /api/u90/pumping
const router = express.Router();

router.use('/pg', pGPumpingRoutes);
router.use('/rg', rGPumpingRoutes);
router.use('/diesel', dieselPumpingRoutes);

module.exports = router;
