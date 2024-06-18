const express = require('express');

const Unit53TanksControllers = require('../../controllers/u53/u53Tanks');

const router = express.Router();

// /api/53/....
router.get('/:day', Unit53TanksControllers.getAllTanksByDay);

router.get('/:from/:to', Unit53TanksControllers.getAllTanksBetweenTwoDates);

router.get('/tank/:tag_number/:day', Unit53TanksControllers.getTankByDay);

router.get(
  '/tank/:tag_number/:from/:to',
  Unit53TanksControllers.getTankBetweenTwoDates
);

//{day: "01-01-2024, tanks: {[tag_number]: [TOV]}"}
router.post('/', Unit53TanksControllers.addVolumeToTanks);

// {tag_number:"", tov:$num,day: "01-01-2024}
router.post('/tank', Unit53TanksControllers.addVolumeToOneTank);

// {tov: $$$}
router.patch(
  '/tank/:tag_number/:day',
  Unit53TanksControllers.updateOneTankVolume
);

router.patch('/confirmation', Unit53TanksControllers.confimTankVolume);

module.exports = router;
