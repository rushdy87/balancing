const express = require('express');

const Unit53TanksControllers = require('../controllers/u53Tanks');

const router = express.Router();

// /api/53/....
router.get('/tanks/:day', Unit53TanksControllers.getAllTanksByDay);

router.get(
  '/tanks/:from/:to',
  Unit53TanksControllers.getAllTanksBetweenTwoDates
);

router.get('/tank/:tag_number/:day', Unit53TanksControllers.getTankByDay);

router.get(
  '/tank/:tag_number/:from/:to',
  Unit53TanksControllers.getTankBetweenTwoDates
);

//{day: "01-01-2024, tanks: {[tag_number]: [TOV]}"}
router.post('/tanks', Unit53TanksControllers.addVolumeToTanks);

// {tag_number:"", tov:$num,day: "01-01-2024}
router.post('/tank', Unit53TanksControllers.addVolumeToOneTank);

// {tov: $$$}
router.patch(
  '/tank/:tag_number/:day',
  Unit53TanksControllers.updateOneTankVolume
);

module.exports = router;
