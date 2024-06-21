const express = require('express');

const lpgTransport = require('./lpgTransport');
const rgTransport = require('./rgTransport');
const atkTransport = require('./atkTransport');

// /api/u90/transport
const router = express.Router();

router.use('/lpg', lpgTransport);
router.use('/rg', rgTransport);
router.use('/atk', atkTransport);
// router.use('/hfo');

module.exports = router;
