const express = require('express');

const BlendingControllers = require('../../controllers/u52/blending');

const router = express.Router();

// /api/u52/....

// Blending
router.get('/:day', BlendingControllers.getAllBlendingQuantitiesByDay);
// res. => {day, lpg, pg, rg, diesel, hfo}

router.get(
  '/:from/:to',
  BlendingControllers.getAllBlendingQuantitiesBetweenTwoDates
);

router.post('/', BlendingControllers.AddBlendingVolumes);
// req => {day, diesel:someNumber, HFO: someNumber, ...}

// edit Blinding Volue
// req {day, products: {}}
router.patch('/', BlendingControllers.updateBlendingVolumes);

// confirm the blindings
router.patch('/confirmation', BlendingControllers.confirmBlendingVolumes);

module.exports = router;
