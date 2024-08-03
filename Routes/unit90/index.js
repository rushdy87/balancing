const express = require('express');

const u90TanksRoutes = require('./tanks');
const u90PumpingRoutes = require('./pumping');
const u90TransportRoutes = require('./transport');
const NotesRoutes = require('./notes');
const AdminRoutes = require('./admin');

// /api/u90/
const router = express.Router();

router.use('/tanks', u90TanksRoutes);
router.use('/pumping', u90PumpingRoutes);
router.use('/transport', u90TransportRoutes);
router.use('/notes', NotesRoutes);
router.use('/admin', AdminRoutes);

module.exports = router;
