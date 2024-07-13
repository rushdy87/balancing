const express = require('express');

const { getBlendingByDay } = require('../../controllers/unit52/blending');

const router = express.Router();

// /api/u52/blending/....

// Blending
router.get('/:day', getBlendingByDay);
// res. => {day, lpg, pg, rg, diesel, hfo}

router.get('/:from/:to');

router.post('/');
// req => {day, diesel:someNumber, HFO: someNumber, ...}

// edit Blinding Volue
// req {day, products: {}}
router.patch('/');

// confirm the blindings
router.patch('/confirmation');

module.exports = router;
