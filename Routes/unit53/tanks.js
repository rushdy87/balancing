const express = require('express');

const {
  getTanksByDay,
  getTanksBetweenTwoDates,
  addVolumeToTanks,
  updateOneTankVolume,
  confirmTankVolume,
} = require('../../controllers/unit53/tanks');

const router = express.Router();

// /api/u53/tanks/....

router.get('/:day', getTanksByDay);

router.get('/:from/:to', getTanksBetweenTwoDates);

//{day: "01-01-2024, tanks: {[tag_number]: [TOV]}"}
router.post('/', addVolumeToTanks);

// {tov: $$$}
router.patch('/tank/:tag_number/:day', updateOneTankVolume);

router.patch('/confirmation', confirmTankVolume);

module.exports = router;
