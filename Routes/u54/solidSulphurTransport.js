const express = require('express');

const SolidSulphurTransportControllers = require('../../controllers/u54/solidSulphurTransport');

const router = express.Router();

// /api/u54/solid-sulphur....

router.get('/:day', SolidSulphurTransportControllers.getSolidSulphurTransport);
// res => {day, quantity, tankers, isConfirmed}

router.get(
  '/:from/:to',
  SolidSulphurTransportControllers.getSolidSulphurTransportBetweenTwoDates
);

router.post('/', SolidSulphurTransportControllers.addSolidSulphurTransport);
// body = {day, quantity, tankers}

router.patch('/', SolidSulphurTransportControllers.updateSolidSulphurTransport);
// body = { day, items:[...] };

router.patch(
  '/confirmation',
  SolidSulphurTransportControllers.confirmeSolidSulphur
);

module.exports = router;
