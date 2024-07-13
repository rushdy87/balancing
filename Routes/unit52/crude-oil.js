const express = require('express');
const {
  getCrudeOilByDay,
  getCrudeOilBetweenTwoDates,
  updateCrudeOil,
  confirmOilVolumes,
  addCrudeOil,
} = require('../../controllers/unit52/crude-oil');

const router = express.Router();

// /api/u52/crude....

// Crude Oil
router.get('/:day', getCrudeOilByDay);
// res. => {}

router.get('/:from/:to', getCrudeOilBetweenTwoDates);

router.post('/', addCrudeOil);
// req => {date, reservoir_m3, reservoir_bbl', receiving, sending'}

// req {day, items: {}}
router.patch('/', updateCrudeOil);

// confirm the blindings
router.patch('/confirmation', confirmOilVolumes);

module.exports = router;
