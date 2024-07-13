const express = require('express');

const u52TanksRoutes = require('./tanks');
const blendingRoutes = require('./blending');
const CrudeOilRoutes = require('./crude-oil');
const NaturalGasRoutes = require('./natural-gas');
const NotesRoutes = require('./notes');

// /api/u52/
const router = express.Router();

router.use('/tanks', u52TanksRoutes);
router.use('/blending', blendingRoutes);
router.use('/crude', CrudeOilRoutes);
router.use('/gas', NaturalGasRoutes);
router.use('/notes', NotesRoutes);

module.exports = router;
