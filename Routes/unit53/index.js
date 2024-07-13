const express = require('express');

const u53TanksRoutes = require('./tanks');
const PavingAsphaltTransportRoutes = require('./paving-asphalt-transport');

// /api/u52/
const router = express.Router();

router.use('/tanks', u53TanksRoutes);
router.use('/transport', PavingAsphaltTransportRoutes);

module.exports = router;
