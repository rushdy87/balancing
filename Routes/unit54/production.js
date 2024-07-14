const express = require('express');
const {
  getSolidSulphurProduction,
  getSolidSulphurProductionBetweenTwoDates,
  addSolidSulphur,
  updateSolidSulphurProduction,
  confirmeSolidSulphurProduction,
} = require('../../controllers/unit54/production');

const router = express.Router();

// /api/u54/production....

router.get('/:day', getSolidSulphurProduction);
// res => {day, quantity isConfirmed}

router.get('/:from/:to', getSolidSulphurProductionBetweenTwoDates);

router.post('/', addSolidSulphur);
// body = {day, quantity}

router.patch('/', updateSolidSulphurProduction);
// body = { day, quantity };

router.patch('/confirmation', confirmeSolidSulphurProduction);

module.exports = router;
