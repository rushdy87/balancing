const express = require('express');

const BlendingControllers = require('../../controllers/u52/blending');

const router = express.Router();

// /api/u52/....

// Blending
router.get('/:day', BlendingControllers.getAllBlendingQuantitiesByDay);
// res. => {day, diesel ={id, quantity, isConfirmed}}, hfo ={id, quantity, isConfirmed}}, ...}

router.get(
  '/:from/:to',
  BlendingControllers.getAllBlendingQuantitiesBetweenTwoDates
);

router.post('/');
BlendingControllers.AddBlendingVolumes;

module.exports = router;
