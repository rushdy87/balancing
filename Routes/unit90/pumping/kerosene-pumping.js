const express = require('express');
const {
  getPumpingByDay,
  getPumpingBetweenTwoDates,
  addPumping,
  updatePumping,
  confirmPumping,
} = require('../../../controllers/unit90/pumping/kerosene-pumping');

const router = express.Router();

// /api/u90/pumping/pg

router.get('/:day', getPumpingByDay);

router.get('/:from/:to', getPumpingBetweenTwoDates);

router.post('/', addPumping);
// {'day', 'toKarbala', 'toNajaf'}

router.patch('/', updatePumping);
// {day, items:{}}

router.patch('/confirmation', confirmPumping);

module.exports = router;
