const express = require('express');

const DieselumpingControllers = require('../../../controllers/u90/pumping/dieselPumping');

const router = express.Router();

// /api/u90/pumping/pg

router.get('/:day', DieselumpingControllers.getPumpingByDay);

router.get('/:from/:to', DieselumpingControllers.getPumpingBetweenTwoDates);

router.post('/', DieselumpingControllers.addPumping);
// {'day', 'toKarbala', 'toNajaf'}

router.patch('/', DieselumpingControllers.updatePumping);
// {day, items:{}}

router.patch('/confirmation', DieselumpingControllers.confirmDieselPumping);

module.exports = router;
