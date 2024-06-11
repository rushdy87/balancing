const express = require('express');

const Unit52TanksControllers = require('../controllers/u52Tanks');

const router = express.Router();

// /api/u52/....
router.get('/tanks/:day', Unit52TanksControllers.getAllTanksByDay);

router.get(
  '/tanks/:from/:to',
  Unit52TanksControllers.getAllTanksBetweenTwoDates
);

router.get('/tank/:tag_number/:day', Unit52TanksControllers.getTankByDay);

router.get(
  '/tank/:tag_number/:from/:to',
  Unit52TanksControllers.getTankBetweenTwoDates
);

//{day: "01-01-2024, tanks: {[tag_number]: [TOV]}"}
router.post('/tanks', Unit52TanksControllers.addVolumeToTanks);

// {tag_number:"", tov:$num,day: "01-01-2024}
router.post('/tank', Unit52TanksControllers.addVolumeToOneTank);

// {tov: $$$}
router.patch(
  '/tank/:tag_number/:day',
  Unit52TanksControllers.updateOneTankVolume
);

module.exports = router;