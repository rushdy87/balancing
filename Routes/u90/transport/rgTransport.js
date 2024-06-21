const express = require('express');

const RGTransportControllers = require('../../../controllers/u90/transport/rgTransport');

const router = express.Router();

// /api/90/transport/lpg....
router.get('/:day', RGTransportControllers.getRGTransport);

router.get('/:from/:to', RGTransportControllers.getRGTransportBetweenTwoDates);

//{day, quantity, tankers"}
router.post('/', RGTransportControllers.addRGTransport);

// {day, ..}
router.patch('/', RGTransportControllers.updateRGTransport);

router.patch('/confirmation', RGTransportControllers.confirmRGTransport);

module.exports = router;
