const express = require('express');

const Unit52TanksControllers = require('../../controllers/u52/u52Tanks');
const Unit52CrudeControllers = require('../../controllers/u52/crudeOil');
const Unit52GasControllers = require('../../controllers/u52/naturalGas');
const Unit52BlendingControllers = require('../../controllers/u52/blending');

const router = express.Router();

// Unit 52
// 1. get tank info for a specific day
router.get('/u52/tank/:tag_number/:day', Unit52TanksControllers.getTankByDay);

// 2. get all tanks for a specific day
router.get('/u52/all/:day', Unit52TanksControllers.getAllTanksByDay);

// 3. get tank info for a specific date range.
router.get(
  '/u52/tank/:tag_number/:from/:to',
  Unit52TanksControllers.getTankBetweenTwoDates
);
// 4. get all tanks for a specific date range.
router.get(
  '/u52/all/:from/:to',
  Unit52TanksControllers.getAllTanksBetweenTwoDates
);

// 5. get crude oil for  a specific day.
router.get('/u52/crude/:day', Unit52CrudeControllers.getAllOilQuantitiesByDay);

// 6. get crude oil for  a specific date range.
router.get(
  '/u52/crude/:from/:to',
  Unit52CrudeControllers.getAllOilQuantitiesBetweenTwoDates
);

// 7. get naturl gas for  a specific day.
router.get('/u52/gas/:day', Unit52GasControllers.getNaturalGasByDay);

// 8. get naturl gas for  a specific date range.
router.get(
  '/u52/gas/:from/:to',
  Unit52GasControllers.getAllNaturalGasQuantitiesBetweenTwoDates
);

// 9. get blending for  a specific day.
router.get(
  '/u52/blending/:day',
  Unit52BlendingControllers.getAllBlendingQuantitiesByDay
);

// 10. get blending for  a specific date range.
router.get(
  '/u52/blending/:from/:to',
  Unit52BlendingControllers.getAllBlendingQuantitiesBetweenTwoDates
);

// Unit 53
// 1. get tank info for a specific day
// 2. get all tanks for a specific day
// 3. get Asphalt transport for a specific day
// 4. get  Asphalt transport  for a specific date range

// Unit 54
// 1. get Solid Sulphur Storeage for a specific day
// 2. get Solid Sulphur Storeage for a specific date range
// 3. get Solid Sulphur Production for a specific day
// 4. get Solid Sulphur Production for a specific date range
// 5. get Solid Sulphur Transport for a specific day
// 6. get Solid Sulphur Transport for a specific date range

// Unit 90
// 1. get tank info for a specific day
// 2. get all tanks for a specific day
// 3. get tank info for a specific date range.
// 4. get all tanks for a specific date range.
// 5. get Diesel Pumping for a specific day
// 6. get Diesel Pumping for a specific date range
// 7. get Kerosene Pumping for a specific day
// 8. get Kerosene Pumping for a specific date range
// 9. get PG Pumping for a specific day
// 10. get PG Pumping for a specific date range
// 11. get RG Pumping for a specific day
// 12. get RG Pumping for a specific date range
// 13. get ATK Transport for a specific day
// 14. get ATK Transport for a specific date range
// 15. get PG Transport for a specific day
// 16. get PG Transport for a specific date range
// 17. get RG Transport for a specific day
// 18. get RG Transport for a specific date range
// 19. get HFO Transport for a specific day
// 20. get HFO Transport for a specific date range
// 21. get HFO Transport for a specific day and side a specific
// 22. get HFO Transport for a specific date range and side a specific

// REPORTS
// 1. get a full report for a specific day.

module.exports = router;
