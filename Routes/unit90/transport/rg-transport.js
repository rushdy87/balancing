const express = require('express');

const {
  getTransportbyDay,
  getTransportBetweenTwoDates,
  addTransport,
  updateTransport,
  confirmeTransport,
} = require('../../../controllers/unit90/transport/rg-transport');

const router = express.Router();

// /api/90/transport/rg....
router.get('/:day', getTransportbyDay);

router.get('/:from/:to', getTransportBetweenTwoDates);

//{day, quantity, tankers"}
router.post('/', addTransport);

// {day, ..}
router.patch('/', updateTransport);

router.patch('/confirmation', confirmeTransport);

module.exports = router;
