const express = require('express');

const u53TanksRoutes = require('./tanks');
const PavingAsphaltTransportRoutes = require('./transport');
const NotesRoutes = require('./notes');
const AdminRoutes = require('./admin');

// /api/u53/
const router = express.Router();

router.use('/tanks', u53TanksRoutes);
router.use('/transport', PavingAsphaltTransportRoutes);
router.use('/notes', NotesRoutes);
router.use('/admin', AdminRoutes);

module.exports = router;
