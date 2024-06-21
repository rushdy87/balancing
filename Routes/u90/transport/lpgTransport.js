const express = require('express');

const LPGTransportControllers = require('../../../controllers/u90/transport/lpgTransport');

const router = express.Router();

// /api/90/transport/lpg....
router.get('/:day', LPGTransportControllers.getLPGTransport);

router.get(
  '/:from/:to',
  LPGTransportControllers.getLPGTransportBetweenTwoDates
);

//{day, quantity, tankers"}
router.post('/', LPGTransportControllers.addLPGTransport);

// {day, ..}
router.patch('/', LPGTransportControllers.updateLPGTransport);

router.patch('/confirmation', LPGTransportControllers.confirmLPGTransport);

module.exports = router;
