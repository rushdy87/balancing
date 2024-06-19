const express = require('express');

const Unit54StorageControllers = require('../../controllers/u54/unit54Storage');

const router = express.Router();

// /api/u54/store....

router.get('/:day', Unit54StorageControllers.getSolidSulphurStore);
// res => {day, working_quantity, actual_quantity, isConfirmed}

router.get(
  '/:from/:to',
  Unit54StorageControllers.getSolidSulphurStoreBetweenTwoDates
);

router.post('/', Unit54StorageControllers.addSolidSulphurStore);
// body = {day, actual_quantity}

router.patch('/', Unit54StorageControllers.updateSolidSulphurStore);
// body = { day, actual_quantity };

router.patch(
  '/confirmation',
  Unit54StorageControllers.confirmeSolidSulphurStore
);
module.exports = router;
