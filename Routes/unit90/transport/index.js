const express = require('express');

const LPGTransportRoutes = require('./lpg-transport');
const RGTransportRoutes = require('./rg-transport');
const ATKTransportRoutes = require('./atk-transport');
const HFOTransportRoutes = require('./hfo-transport');

// /api/u90/transport
const router = express.Router();

router.use('/lpg', LPGTransportRoutes);
router.use('/rg', RGTransportRoutes);
router.use('/atk', ATKTransportRoutes);
router.use('/hfo', HFOTransportRoutes);

module.exports = router;
