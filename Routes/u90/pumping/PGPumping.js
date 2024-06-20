const express = require('express');

const PGPumpingControllers = require('../../../controllers/u90/pumping/PGPumping');

const router = express.Router();

// /api/u90/pumping/pg

router.get('/:day', PGPumpingControllers.getPumpingByDay);

router.get('/:from/:to', PGPumpingControllers.getPumpingBetweenTwoDates);

router.post('/', PGPumpingControllers.addPumping);
// {'day', 'toKarbala', 'toNajaf'}

router.patch('/', PGPumpingControllers.updatePumping);
// {day, items:{}}

router.patch('/confirmation', PGPumpingControllers.confirmPGPumping);

module.exports = router;
