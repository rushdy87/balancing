const express = require('express');
const {} = require('../../controllers/unit53/transport');
const {
  getSolidSulphurTransportbyDay,
  getSolidSulphurTransportBetweenTwoDates,
  addSolidSulphurTransport,
  updateSolidSulphurTransport,
  confirmeSolidSulphurTransport,
} = require('../../controllers/unit54/transport');

const router = express.Router();

// /api/u54....
router.get('/:day', getSolidSulphurTransportbyDay);

router.get('/:from/:to', getSolidSulphurTransportBetweenTwoDates);

//{day, quantity, tankers"}
router.post('/', addSolidSulphurTransport);

// {day, ..}
router.patch('/', updateSolidSulphurTransport);

router.patch('/confirmation', confirmeSolidSulphurTransport);

module.exports = router;
