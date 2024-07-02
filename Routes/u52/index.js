const express = require('express');

const u52TanksRoutes = require('./u52Tanks');
const blendingRoutes = require('./blending');
const crudeOilRoutes = require('./crudeOil');
const naturalGasRoutes = require('./naturalGas');
const u52NotesRoutes = require('./u52Notes');

// /api/u52/
const router = express.Router();

router.use('/tanks', u52TanksRoutes);
router.use('/blending', blendingRoutes);
router.use('/crude', crudeOilRoutes);
router.use('/gas', naturalGasRoutes);
router.use('/notes', u52NotesRoutes);

module.exports = router;
