const express = require('express');

const HFOTransportControllers = require('../../../controllers/u90/transport/hfoTransport');

const router = express.Router();

// /api/90/transport/hfo....
router.get('/:day', HFOTransportControllers.getHFOTransportByDay);

router.get(
  '/:from/:to',
  HFOTransportControllers.getHFOTransportBetweenTwoDates
);

//{day, to, quantity, tankers"}
router.post('/', HFOTransportControllers.addHFOTransport);

// {day, ..}
router.patch('/', HFOTransportControllers.updateHFOTransport);

router.patch('/confirmation', HFOTransportControllers.confirmHFOTransport);

module.exports = router;
