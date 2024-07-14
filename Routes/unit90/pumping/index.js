const express = require('express');

const PGPumpingRoutes = require('./premium-gasoline-pumping');

// /api/u90/pumping
const router = express.Router();

router.use('/pg', PGPumpingRoutes);

module.exports = router;
