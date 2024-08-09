const express = require('express');

const {
  getSolidSulphurByDay,
  getSolidSulphurBetweenTwoDates,
  addSolidSulphur,
  updateSolidSulphurStore,
  confirmSolidSulphurStore,
} = require('../../controllers/unit54/storage');

const router = express.Router();

// /api/u54/store....

router.get('/:day', getSolidSulphurByDay);
// res => {day, working_quantity, actual_quantity,day, big_bag, small_bag, silos, temporary_shelter, isConfirmed}

router.get('/:from/:to', getSolidSulphurBetweenTwoDates);

router.post('/', addSolidSulphur);
// body = {day, day, big_bag, small_bag, silos, temporary_shelter}

router.patch('/', updateSolidSulphurStore);
// body = { day, data };

router.patch('/confirmation', confirmSolidSulphurStore);
module.exports = router;
