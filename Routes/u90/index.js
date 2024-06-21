const express = require('express');

const u90TanksRoutes = require('./u90Tanks');
const u90PumpingRoutes = require('./pumping');
const u90TransportRoutes = require('./transport');

// /api/u90
const router = express.Router();

router.use('/tanks', u90TanksRoutes);
router.use('/pumping', u90PumpingRoutes);
router.use('/transport', u90TransportRoutes);

module.exports = router;
