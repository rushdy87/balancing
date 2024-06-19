const express = require('express');

const SolidSulphurProductionControllers = require('../../controllers/u54/solidSulphurProduction');

const router = express.Router();

// /api/u54/production....

router.get(
  '/:day',
  SolidSulphurProductionControllers.getSolidSulphurProduction
);
// res => {day, quantity isConfirmed}

router.get(
  '/:from/:to',
  SolidSulphurProductionControllers.getSolidSulphurProductionBetweenTwoDates
);

router.post('/', SolidSulphurProductionControllers.addSolidSulphurProduction);
// body = {day, quantity}

router.patch(
  '/',
  SolidSulphurProductionControllers.updateSolidSulphurProduction
);
// body = { day, quantity };

router.patch(
  '/confirmation',
  SolidSulphurProductionControllers.confirmeSolidSulphurProduction
);

module.exports = router;
