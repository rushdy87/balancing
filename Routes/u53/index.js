const express = require('express');

const u53TanksRoutes = require('./u53Tanks');
const PavingAsphaltRoutes = require('./pavingAsphaltTransport');

// /api/52/
const router = express.Router();

router.use('/tanks', u53TanksRoutes);
router.use('/asphalt', PavingAsphaltRoutes);

module.exports = router;
