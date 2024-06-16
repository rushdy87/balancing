const express = require('express');

const CrudeOilControllers = require('../../controllers/u52/crudeOil');

const router = express.Router();

// /api/u52/crude....

// Crude Oil
router.get('/:day', CrudeOilControllers.getAllOilQuantitiesByDay);
// res. => {}

router.get(
  '/:from/:to',
  CrudeOilControllers.getAllOilQuantitiesBetweenTwoDates
);

router.post('/', CrudeOilControllers.AddOilVolumes);
// req => {date, reservoir_m3, reservoir_bbl', receiving, sending'}

// edit Blinding Volue
// req {day, items: {}}
router.patch('/', CrudeOilControllers.updateOilVolumes);

// confirm the blindings
router.patch('/confirmation', CrudeOilControllers.confirmOilVolumes);

module.exports = router;
