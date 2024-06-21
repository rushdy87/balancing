const express = require('express');

const u54StorageRoutes = require('./u54Storage');
const solidSulphurTransportRoutes = require('./solidSulphurTransport');
const solidSulphurProductionRoutes = require('./solidSulphurProduction');

// /api/54/
const router = express.Router();

router.use('/store', u54StorageRoutes);
router.use('/transport/solid-sulphur', solidSulphurTransportRoutes);
router.use('/production', solidSulphurProductionRoutes);

module.exports = router;
