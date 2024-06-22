const express = require('express');

const lpgTransport = require('./lpgTransport');
const rgTransport = require('./rgTransport');
const atkTransport = require('./atkTransport');
const hfoTransport = require('./hfoTransport');

// /api/u90/transport
const router = express.Router();

router.use('/lpg', lpgTransport);
router.use('/rg', rgTransport);
router.use('/atk', atkTransport);
router.use('/hfo', hfoTransport);

module.exports = router;
