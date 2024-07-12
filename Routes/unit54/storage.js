const express = require('express');

const { getSolidSulphurByDay } = require('../../controllers/unit54/storage');

const router = express.Router();

// /api/u54/store....

router.get('/:day', getSolidSulphurByDay);
// res => {day, working_quantity, actual_quantity, isConfirmed}

router.get('/:from/:to');

router.post('/');
// body = {day, actual_quantity}

router.patch('/');
// body = { day, actual_quantity };

router.patch('/confirmation');
module.exports = router;
