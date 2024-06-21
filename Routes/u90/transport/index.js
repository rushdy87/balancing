const express = require('express');

const lpgTransport = require('./lpgTransport');
const rgTransport = require('./rgTransport');

// /api/u90/transport
const router = express.Router();

router.use('/lpg', lpgTransport);
router.use('/rg', rgTransport);
// router.use('/atk');
// router.use('/hfo');

module.exports = router;
