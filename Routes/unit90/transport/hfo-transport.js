const express = require('express');

const {
  getHFOTransportByDay,
  getHFOTransportBetweenTwoDates,
  addHFOTransport,
  updateHFOTransport,
  confirmHFOTransport,
  getHFOTransportBySide,
  getHFOTransportBySideBetweenTwoDates,
} = require('../../../controllers/unit90/transport/hfo-transport');

const router = express.Router();

// /api/90/transport/hfo....
router.get('/:day', getHFOTransportByDay);

router.get('/:from/:to', getHFOTransportBetweenTwoDates);

router.get('/side/:day/:side', getHFOTransportBySide);

router.get('/side/:from/:to/:side', getHFOTransportBySideBetweenTwoDates);

// {day: "01-01-2024, data: [{side, quantity, tankers},{}, {}]}
router.post('/', addHFOTransport);

// {day, ..}
router.patch('/', updateHFOTransport);

router.patch('/confirmation', confirmHFOTransport);

module.exports = router;
