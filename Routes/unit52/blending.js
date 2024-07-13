const express = require('express');

const {
  getBlendingByDay,
  getBlendingBetweenTwoDates,
  AddBlendingVolumes,
  updateBlendingVolumes,
  confirmBlending,
} = require('../../controllers/unit52/blending');

const router = express.Router();

// /api/u52/blending/....

// Blending
router.get('/:day', getBlendingByDay);
// res. => {day, lpg, pg, rg, diesel, hfo}

router.get('/:from/:to', getBlendingBetweenTwoDates);

router.post('/', AddBlendingVolumes);
// req => {day, diesel:someNumber, HFO: someNumber, ...}

// edit Blinding Volue
// req {day, products: {}}
router.patch('/', updateBlendingVolumes);

// confirm the blindings
router.patch('/confirmation', confirmBlending);

module.exports = router;
