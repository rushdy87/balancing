const express = require('express');

const KerosenePumpingControllers = require('../../../controllers/u90/pumping/kerosenePumping');

const router = express.Router();

// /api/u90/pumping/pg

router.get('/:day', KerosenePumpingControllers.getPumpingByDay);

router.get('/:from/:to', KerosenePumpingControllers.getPumpingBetweenTwoDates);

router.post('/', KerosenePumpingControllers.addPumping);
// {'day', 'toKarbala', 'toNajaf'}

router.patch('/', KerosenePumpingControllers.updatePumping);
// {day, items:{}}

router.patch(
  '/confirmation',
  KerosenePumpingControllers.confirmKerosenePumping
);

module.exports = router;
