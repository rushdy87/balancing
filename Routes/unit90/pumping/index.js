const express = require('express');

const PGPumpingRoutes = require('./premium-gasoline-pumping');
const RGPumpingRoutes = require('./regular-gasoline-pumping');
const DieselPumpingRoutes = require('./diesel-pumping');
const KerosenePumpingRoutes = require('./kerosene-pumping');

// /api/u90/pumping
const router = express.Router();

router.use('/pg', PGPumpingRoutes);
router.use('/rg', RGPumpingRoutes);
router.use('/diesel', DieselPumpingRoutes);
router.use('/kerosene', KerosenePumpingRoutes);

module.exports = router;
