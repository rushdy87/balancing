const express = require('express');

const u54StorageRoutes = require('./storage');
const SolidSulphurTransportRoutes = require('./transport');

// /api/u52/
const router = express.Router();

router.use('/store', u54StorageRoutes);
router.use('/transport', SolidSulphurTransportRoutes);

module.exports = router;
