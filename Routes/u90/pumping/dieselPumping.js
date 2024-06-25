const express = require('express');

const DieselPumpingControllers = require('../../../controllers/u90/pumping/dieselPumping');

const router = express.Router();

// /api/u90/pumping/pg

router.get('/:day', DieselPumpingControllers.getPumpingByDay);

router.get('/:from/:to', DieselPumpingControllers.getPumpingBetweenTwoDates);

router.post('/', DieselPumpingControllers.addPumping);
// {'day', 'toKarbala', 'toNajaf'}

router.patch('/', DieselPumpingControllers.updatePumping);
// {day, items:{}}

router.patch('/confirmation', DieselPumpingControllers.confirmDieselPumping);

module.exports = router;
