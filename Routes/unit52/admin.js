const { Router } = require('express');
const { getAllData } = require('../../controllers/unit52/admin');
const { confirmTankVolume } = require('../../controllers/unit52/tanks');
const { confirmOilVolumes } = require('../../controllers/unit52/crude-oil');
const { confirmGasVolumes } = require('../../controllers/unit52/natural-gas');
const { confirmBlending } = require('../../controllers/unit52/blending');
const { addNotes } = require('../../controllers/unit52/notes');

const router = Router();
// /api/u52/admin/....

router.get('/all/:day', getAllData);
router.put('/confirm-tank', confirmTankVolume);
router.put('/confirm-crude', confirmOilVolumes);
router.put('/confirm-gas', confirmGasVolumes);
router.put('/confirm-blending', confirmBlending);
router.post('/notes', addNotes);

module.exports = router;
