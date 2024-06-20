const express = require('express');

const pGPumpingRoutes = require('./PGPumping');

// /api/u90/pumping
const router = express.Router();

router.use('/pg', pGPumpingRoutes);

module.exports = router;
