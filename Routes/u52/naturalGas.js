const express = require('express');

const NaturalGasControllers = require('../../controllers/u52/naturalGas');

const router = express.Router();

// /api/u52/gas....

// Crude Oil
router.get('/:day', NaturalGasControllers.getNaturalGasByDay);
// res. => {}

router.get(
  '/:from/:to',
  NaturalGasControllers.getAllNaturalGasQuantitiesBetweenTwoDates
);

router.post('/', NaturalGasControllers.AddNaturalGasVolumes);
// req => {date, receiving_m3, receiving_mscf}

// edit Blinding Volue
// req {day, items: {}}
router.patch('/', NaturalGasControllers.updateNaturalGasVolumes);

// confirm the blindings
router.patch('/confirmation', NaturalGasControllers.confirmNaturalGasVolumes);

module.exports = router;
