const express = require('express');

const RGPumpingControllers = require('../../../controllers/u90/pumping/RGPumping');

const router = express.Router();

// /api/u90/pumping/pg

router.get('/:day', RGPumpingControllers.getPumpingByDay);

router.get('/:from/:to', RGPumpingControllers.getPumpingBetweenTwoDates);

router.post('/', RGPumpingControllers.addPumping);
// {'day', 'toKarbala', 'toNajaf'}

router.patch('/', RGPumpingControllers.updatePumping);
// {day, items:{}}

router.patch('/confirmation', RGPumpingControllers.confirmRGPumping);

module.exports = router;
