const express = require('express');

const u53TanksRoutes = require('./u53Tanks');
const PavingAsphaltRoutes = require('./pavingAsphaltTransport');
const u53NotesRoutes = require('./u53Notes');

// /api/52/
const router = express.Router();

router.use('/tanks', u53TanksRoutes);
router.use('/transport/paving-asphalt', PavingAsphaltRoutes);
router.use('/notes', u53NotesRoutes);

module.exports = router;
