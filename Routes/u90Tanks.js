const express = require('express');

const Unit90TanksControllers = require('../controllers/u90Tanks');

const router = express.Router();

// /api/90/....
router.get('/tanks/:day', Unit90TanksControllers.getAllTanksByDay);

router.get(
  '/tanks/:from/:to',
  Unit90TanksControllers.getAllTanksBetweenTwoDates
);

router.get('/tank/:tag_number/:day', Unit90TanksControllers.getTankByDay);

router.get(
  '/tank/:tag_number/:from/:to',
  Unit90TanksControllers.getTankBetweenTwoDates
);

//{day: "01-01-2024, tanks: {[tag_number]: [TOV]}"}
router.post('/tanks', Unit90TanksControllers.addVolumeToTanks);

// {tag_number:"", tov:$num,day: "01-01-2024}
router.post('/tank', Unit90TanksControllers.addVolumeToOneTank);

// {tov: $$$}
router.patch(
  '/tank/:tag_number/:day',
  Unit90TanksControllers.updateOneTankVolume
);

module.exports = router;
