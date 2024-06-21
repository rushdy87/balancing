const express = require('express');

const lpgTransport = require('./lpgTransport');

// /api/u90/transport
const router = express.Router();

router.use('/lpg', lpgTransport);
// router.use('/rg');
// router.use('/atk');
// router.use('/hfo');

module.exports = router;
