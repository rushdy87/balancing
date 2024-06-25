const express = require('express');
// unit 52
const Unit52TanksControllers = require('../../controllers/u52/u52Tanks');
const Unit52CrudeControllers = require('../../controllers/u52/crudeOil');
const Unit52GasControllers = require('../../controllers/u52/naturalGas');
const Unit52BlendingControllers = require('../../controllers/u52/blending');
// unit 53
const Unit53TanksControllers = require('../../controllers/u53/u53Tanks');
const PavingAsphaltTransportController = require('../../controllers/u53/pavingAsphaltTransport');
// Unit 54
const Unit54StorageControllers = require('../../controllers/u54/unit54Storage');
const Unit54ProductionControllers = require('../../controllers/u54/solidSulphurProduction');
const Unit54TransportControllers = require('../../controllers/u54/solidSulphurTransport');

// Unit 90
const Unit90TanksControllers = require('../../controllers/u90/u90Tanks');
const PGPumpingControllers = require('../../controllers/u90/pumping/PGPumping');
const RGPumpingControllers = require('../../controllers/u90/pumping/RGPumping');
const DieselPumpingControllers = require('../../controllers/u90/pumping/dieselPumping');
const kerosenePumpingControllers = require('../../controllers/u90/pumping/kerosenePumping');
const LPGTransportControllers = require('../../controllers/u90/transport/lpgTransport');
const RGTransportControllers = require('../../controllers/u90/transport/rgTransport');
const ATKTransportControllers = require('../../controllers/u90/transport/atkTransport');
const HFOTransportControllers = require('../../controllers/u90/transport/hfoTransport');

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
router.get('/u53/tank/:tag_number/:day', Unit53TanksControllers.getTankByDay);

// 2. get tank info for a specific date range.
router.get(
  '/u53/tank/:tag_number/:from/:to',
  Unit53TanksControllers.getTankBetweenTwoDates
);

// 3. get all tanks for a specific day
router.get('/u53/all/:day', Unit53TanksControllers.getAllTanksByDay);

// 4. get all tanks for a specific day
router.get(
  '/u53/all/:from/:to',
  Unit53TanksControllers.getAllTanksBetweenTwoDates
);

// 5. get Asphalt transport for a specific day
router.get(
  '/u53/transport/:day',
  PavingAsphaltTransportController.getPavingAsphaltTransportbyDay
);

// 6. get  Asphalt transport  for a specific date range
router.get(
  '/u53/transport/:from/:to',
  PavingAsphaltTransportController.getPavingAsphaltTransportBetweenTwoDates
);

// Unit 54
// 1. get Solid Sulphur Storeage for a specific day
router.get('/u54/store/:day', Unit54StorageControllers.getSolidSulphurStore);

// 2. get Solid Sulphur Storeage for a specific date range
router.get(
  '/u54/store/:from/:to',
  Unit54StorageControllers.getSolidSulphurStoreBetweenTwoDates
);

// 3. get Solid Sulphur Production for a specific day
router.get(
  '/u54/production/:day',
  Unit54ProductionControllers.getSolidSulphurProduction
);
// 4. get Solid Sulphur Production for a specific date range
router.get(
  '/u54/production/:from/:to',
  Unit54ProductionControllers.getSolidSulphurProductionBetweenTwoDates
);
// 5. get Solid Sulphur Transport for a specific day
router.get(
  '/u54/transport/:day',
  Unit54TransportControllers.getSolidSulphurTransport
);
// 6. get Solid Sulphur Transport for a specific date range
router.get(
  '/u54/transport/:from/:to',
  Unit54TransportControllers.getSolidSulphurTransportBetweenTwoDates
);

// Unit 90
// 1. get tank info for a specific day
router.get('/u90/tank/:tag_number/:day', Unit90TanksControllers.getTankByDay);

// 2. get all tanks for a specific day
router.get('/u90/all/:day', Unit90TanksControllers.getAllTanksByDay);

// 3. get tank info for a specific date range.
router.get(
  '/u90/tank/:tag_number/:from/:to',
  Unit90TanksControllers.getTankBetweenTwoDates
);
// 4. get all tanks for a specific date range.
router.get(
  '/u90/all/:from/:to',
  Unit90TanksControllers.getAllTanksBetweenTwoDates
);

// 5. get Diesel Pumping for a specific day
router.get(
  '/u90/pumping/diesel/:day',
  DieselPumpingControllers.getPumpingByDay
);

// 6. get Diesel Pumping for a specific date range
router.get(
  '/u90/pumping/diesel/:from/:to',
  DieselPumpingControllers.getPumpingBetweenTwoDates
);

// 7. get Kerosene Pumping for a specific day
router.get(
  '/u90/pumping/kerosene/:day',
  kerosenePumpingControllers.getPumpingByDay
);

// 8. get Kerosene Pumping for a specific date range
router.get(
  '/u90/pumping/kerosene/:from/:to',
  kerosenePumpingControllers.getPumpingBetweenTwoDates
);

// 9. get PG Pumping for a specific day
router.get('/u90/pumping/pg/:day', PGPumpingControllers.getPumpingByDay);

// 10. get PG Pumping for a specific date range
router.get(
  '/u90/pumping/pg/:from/:to',
  PGPumpingControllers.getPumpingBetweenTwoDates
);

// 11. get RG Pumping for a specific day
router.get('/u90/pumping/rg/:day', RGPumpingControllers.getPumpingByDay);

// 12. get RG Pumping for a specific date range
router.get(
  '/u90/pumping/rg/:from/:to',
  RGPumpingControllers.getPumpingBetweenTwoDates
);

// 13. get ATK Transport for a specific day
router.get('/u90/transport/atk/:day', ATKTransportControllers.getATKTransport);
// 14. get ATK Transport for a specific date range
router.get(
  '/u90/transport/atk/:from/:to',
  ATKTransportControllers.getATKTransportBetweenTwoDates
);
// 15. get LPG Transport for a specific day
router.get('/u90/transport/lpg/:day', LPGTransportControllers.getLPGTransport);

// 16. get LPG Transport for a specific date range
router.get(
  '/u90/transport/lpg/:from/:to',
  LPGTransportControllers.getLPGTransportBetweenTwoDates
);

// 17. get RG Transport for a specific day
router.get('/u90/transport/rg/:day', RGTransportControllers.getRGTransport);

// 18. get RG Transport for a specific date range
router.get(
  '/u90/transport/rg/:from/:to',
  RGTransportControllers.getRGTransportBetweenTwoDates
);

// 19. get HFO Transport for a specific day
router.get(
  '/u90/transport/hfo/all/:day',
  HFOTransportControllers.getHFOTransportByDay
);

// 20. get HFO Transport for a specific date range
router.get(
  '/u90/transport/hfo/all/:from/:to',
  HFOTransportControllers.getHFOTransportBetweenTwoDates
);

// 21. get HFO Transport for a specific day and side a specific
router.get(
  '/u90/transport/hfo/:side/:day',
  HFOTransportControllers.getHFOTransportBySide
);
// 22. get HFO Transport for a specific date range and side a specific
router.get(
  '/u90/transport/hfo/:side/:from/:to',
  HFOTransportControllers.getHFOTransportBySideBetweenTwoDates
);
// REPORTS
// 1. get a full report for a specific day.

module.exports = router;
