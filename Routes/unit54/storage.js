const express = require('express');

const {
  getSolidSulphurByDay,
  getSolidSulphurBetweenTwoDates,
  addSolidSulphur,
  updateSolidSulphurStore,
} = require('../../controllers/unit54/storage');

const router = express.Router();

// /api/u54/store....

router.get('/:day', getSolidSulphurByDay);
// res => {day, working_quantity, actual_quantity, isConfirmed}

router.get('/:from/:to', getSolidSulphurBetweenTwoDates);

router.post('/', addSolidSulphur);
// body = {day, actual_quantity}

router.patch('/', updateSolidSulphurStore);
// body = { day, actual_quantity };

router.patch('/confirmation');
module.exports = router;
