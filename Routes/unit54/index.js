const express = require('express');

const u54StorageRoutes = require('./storage');
const SolidSulphurTransportRoutes = require('./transport');
const SolidSulphurProductionRoutes = require('./production');
const NotesRoutes = require('./notes');

// /api/u52/
const router = express.Router();

router.use('/store', u54StorageRoutes);
router.use('/transport', SolidSulphurTransportRoutes);
router.use('/production', SolidSulphurProductionRoutes);
router.use('/notes', NotesRoutes);

module.exports = router;
