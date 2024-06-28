const express = require('express');

const Unit90TanksControllers = require('../../controllers/u90/u90Tanks');

const router = express.Router();

// /api/u90/tanks/....
router.get('/:day', Unit90TanksControllers.getAllTanksByDay);

router.get('/:from/:to', Unit90TanksControllers.getAllTanksBetweenTwoDates);

//{day: "01-01-2024, tanks: {[tag_number]: [TOV]}"}
router.post('/', Unit90TanksControllers.addVolumeToTanks);

// {tag_number:"", tov:$num,day: "01-01-2024}
router.post('/tank', Unit90TanksControllers.addVolumeToOneTank);

// {tov: $$$}
router.patch(
  '/tank/:tag_number/:day',
  Unit90TanksControllers.updateOneTankVolume
);

router.patch('/confirmation', Unit90TanksControllers.confirmTankVolume);
// { tag_number, day }

module.exports = router;
