const express = require('express');

const PavingAsphaltTransportController = require('../../controllers/u53/pavingAsphaltTransport');

const router = express.Router();

// /api/53/asphalt....
router.get(
  '/:day',
  PavingAsphaltTransportController.getPavingAsphaltTransportbyDay
);

router.get(
  '/:from/:to',
  PavingAsphaltTransportController.getPavingAsphaltTransportBetweenTwoDates
);

//{day, quantity, tankers"}
router.post('/', PavingAsphaltTransportController.addPavingAsphaltTransport);

// {day, ..}
router.patch(
  '/',
  PavingAsphaltTransportController.updatePavingAsphaltTransport
);

router.patch(
  '/confirmation',
  PavingAsphaltTransportController.confirmePavingAsphaltTransport
);

module.exports = router;
