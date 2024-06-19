const express = require('express');

const Unit54Storage = require('../../controllers/u54/unit54Storage.js');

const router = express.Router();

// /api/u54/store....

router.get('/:day', Unit54Storage.getSolidSulphurStore);
// res => {day, working_quantity, actual_quantity, isConfirmed}

router.get('/:from/:to', Unit54Storage.getSolidSulphurStoreBetweenTwoDates);

router.post('/', Unit54Storage.addSolidSulphurStore);
// body = {day, actual_quantity}

router.patch('/', Unit54Storage.updateSolidSulphurStore);
// body = { day, actual_quantity };

router.patch('/confirmation', Unit54Storage.confirmeSolidSulphurStore);
module.exports = router;
