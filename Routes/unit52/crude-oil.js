const express = require('express');
const { getCrudeOilByDay } = require('../../controllers/unit52/crude-oil');

const router = express.Router();

// /api/u52/crude....

// Crude Oil
router.get('/:day', getCrudeOilByDay);
// res. => {}

router.get('/:from/:to');

router.post('/');
// req => {date, reservoir_m3, reservoir_bbl', receiving, sending'}

// req {day, items: {}}
router.patch('/');

// confirm the blindings
router.patch('/confirmation');

module.exports = router;
