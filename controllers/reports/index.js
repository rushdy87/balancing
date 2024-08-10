const {
  Unit52Tank,
  Unit53Tank,
  Unit90Tank,
  PGPumping,
  RGPumping,
  KerosenePumping,
  DieselPumping,
  LPGTransport,
  RGTransport,
  ATKTransport,
  PavingAsphaltTransport,
  SolidSulphurTransport,
  HFOTransport,
} = require('../../models');
const {
  formatDate,
  validateInput,
  checkAuthorization,
  findTanksForReport,
  calculateTanksVolumes,
  findSolidSulphurStorageForReport,
  handleError,
  findBlendingByDateForReport,
  findCrudeOilByDateForReport,
  findNaturalGasByDateForReport,
  findSolidSulphurProductionForReport,
  findPumpingForReport,
  findTransportToReport,
  findHFOTransportForReport,
  getTotal,
  findNotesForReport,
} = require('../../utils');

exports.getReportByDay = async (req, res, next) => {
  const { day } = req.params;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);

  const { userData } = req;

  try {
    checkAuthorization(userData, null, next);

    const report = {};

    const u52Tanks = await findTanksForReport(Unit52Tank, 'u52', formattedDate);
    const u53Tanks = await findTanksForReport(Unit53Tank, 'u53', formattedDate);
    const u90Tanks = await findTanksForReport(Unit90Tank, 'u90', formattedDate);
    const tanks = [...u52Tanks, ...u53Tanks, ...u90Tanks];

    const u54Storege = await findSolidSulphurStorageForReport(formattedDate);

    const store = calculateTanksVolumes(tanks);

    store.push({
      product: 'sulphur',
      pumpable: u54Storege.actual_quantity,
      working_volume: u54Storege.working_quantity,
    });
    report.store = store;

    const blending = await findBlendingByDateForReport(formattedDate);

    const solidSulphur = await findSolidSulphurProductionForReport(
      formattedDate
    );

    blending.solidSulphur = solidSulphur;

    report.blending = blending;

    const crudeOil = await findCrudeOilByDateForReport(formattedDate);
    report.crudeOil = crudeOil;

    const naturalGas = await findNaturalGasByDateForReport(formattedDate);
    report.naturalGas = naturalGas;

    // Pumping
    const pgPumping = await findPumpingForReport(PGPumping, formattedDate);
    const rgPumping = await findPumpingForReport(RGPumping, formattedDate);
    const kerosenePumping = await findPumpingForReport(
      KerosenePumping,
      formattedDate
    );
    const dieselPumping = await findPumpingForReport(
      DieselPumping,
      formattedDate
    );
    report.pumping = {
      pgPumping: {
        ...pgPumping,
        total: getTotal(pgPumping.toKarbala, pgPumping.toNajaf),
      },
      rgPumping: {
        ...rgPumping,
        total: getTotal(rgPumping.toKarbala, rgPumping.toNajaf),
      },
      kerosenePumping: {
        ...kerosenePumping,
        total: getTotal(kerosenePumping.toKarbala, kerosenePumping.toNajaf),
      },
      dieselPumping: {
        ...dieselPumping,
        total: getTotal(dieselPumping.toKarbala, dieselPumping.toNajaf),
      },
    };

    const lpgTransport = await findTransportToReport(
      LPGTransport,
      formattedDate
    );
    report.lpgTransport = lpgTransport;

    const rgTransport = await findTransportToReport(RGTransport, formattedDate);
    const atkTransport = await findTransportToReport(
      ATKTransport,
      formattedDate
    );
    report.lightProdectsTransport = { rgTransport, atkTransport };

    const asphaltTransport = await findTransportToReport(
      PavingAsphaltTransport,
      formattedDate
    );
    report.asphaltTransport = asphaltTransport;

    const solidSulphurTransport = await findTransportToReport(
      SolidSulphurTransport,
      formattedDate
    );
    report.solidSulphur = solidSulphurTransport;

    const governmentalTransport = await findHFOTransportForReport(
      HFOTransport,
      1,
      formattedDate
    );
    const nonGovernmentalTransport = await findHFOTransportForReport(
      HFOTransport,
      2,
      formattedDate
    );
    const exportTransport = await findHFOTransportForReport(
      HFOTransport,
      3,
      formattedDate
    );

    report.hfoTransport = {
      governmentalTransport,
      nonGovernmentalTransport,
      exportTransport,
      quantityTotlal: getTotal(
        governmentalTransport.quantity,
        nonGovernmentalTransport.quantity,
        exportTransport.quantity
      ),
      tankersTotlal: getTotal(
        governmentalTransport.tankers,
        nonGovernmentalTransport.tankers,
        exportTransport.tankers
      ),
    };

    const notes = await findNotesForReport(formattedDate);

    report.notes = notes;

    res.status(200).json(report);
  } catch (error) {
    handleError(next, error.message, 500);
  }
};
