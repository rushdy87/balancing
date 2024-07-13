const express = require('express');
const {
  getPavingAsphaltTransportbyDay,
  getPavingAsphaltTransportBetweenTwoDates,
  addPavingAsphaltTransport,
  updatePavingAsphaltTransport,
  confirmePavingAsphaltTransport,
} = require('../../controllers/unit53/paving-asphalt-transport');

const router = express.Router();

// /api/53/asphalt....
router.get('/:day', getPavingAsphaltTransportbyDay);

router.get('/:from/:to', getPavingAsphaltTransportBetweenTwoDates);

//{day, quantity, tankers"}
router.post('/', addPavingAsphaltTransport);

// {day, ..}
router.patch('/', updatePavingAsphaltTransport);

router.patch('/confirmation', confirmePavingAsphaltTransport);

module.exports = router;
