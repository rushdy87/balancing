const express = require('express');

const u54StorageRoutes = require('./u54Storage');
const solidSulphurTransportRoutes = require('./solidSulphurTransport');

// /api/54/
const router = express.Router();

router.use('/store', u54StorageRoutes);
router.use('/solid-sulphur', solidSulphurTransportRoutes);

module.exports = router;
