const express = require('express');
const { getNaturalGasByDay } = require('../../controllers/unit52/natural-gas');

const router = express.Router();

// /api/u52/gas....

router.get('/:day', getNaturalGasByDay);
// res. => {}

router.get('/:from/:to');

router.post('/');
// req => {date, receiving_m3, receiving_mscf}

// edit Blinding Volue
// req {day, items: {}}
router.patch('/');

// confirm the blindings
router.patch('/confirmation');

module.exports = router;
