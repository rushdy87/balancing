const express = require('express');
const {
  getNaturalGasByDay,
  getNaturalGasBetweenTwoDates,
  addNaturalGas,
  updateNaturalGas,
  confirmGasVolumes,
} = require('../../controllers/unit52/natural-gas');

const router = express.Router();

// /api/u52/gas....

router.get('/:day', getNaturalGasByDay);
// res. => {}

router.get('/:from/:to', getNaturalGasBetweenTwoDates);

router.post('/', addNaturalGas);
// req => {date, receiving_m3, receiving_mscf}

// edit Blinding Volue
// req {day, items: {}}
router.patch('/', updateNaturalGas);

// confirm the blindings
router.patch('/confirmation', confirmGasVolumes);

module.exports = router;
