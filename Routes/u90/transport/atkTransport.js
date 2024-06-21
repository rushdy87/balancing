const express = require('express');

const ATKTransportControllers = require('../../../controllers/u90/transport/atkTransport');

const router = express.Router();

// /api/90/transport/lpg....
router.get('/:day', ATKTransportControllers.getATKTransport);

router.get(
  '/:from/:to',
  ATKTransportControllers.getATKTransportBetweenTwoDates
);

//{day, quantity, tankers"}
router.post('/', ATKTransportControllers.addATKTransport);

// {day, ..}
router.patch('/', ATKTransportControllers.updateATKTransport);

router.patch('/confirmation', ATKTransportControllers.confirmATKTransport);

module.exports = router;
