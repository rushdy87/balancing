const express = require('express');

const LPGTransportRoutes = require('./lpg-transport');
// const RGTransportRoutes = require('./rg-transport');
// const ATKTransportRoutes = require('./atk-transport');
// const KeroseneTransportRoutes = require('./kerosene-pumping');

// /api/u90/transport
const router = express.Router();

router.use('/lpg', LPGTransportRoutes);
// router.use('/rg', RGTransportRoutes);
// router.use('/atk', ATKTransportRoutes);
// router.use('/kerosene', KeroseneTransportRoutes);

module.exports = router;
