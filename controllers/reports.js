const moment = require('moment');

const { checkAuthorization } = require('../utils/authorization');

const {
  handleError,
  findAllTanksByDate,
  findOilByDate,
  findNaturalGasByDate,
  findBlendingByDate,
  findAllPumpingByDate,
  findLightTransportByDate,
  findPavingAsphaltTransportBayDate,
  findSolidSulphurTransportBayDate,
  findSolidSulphurStorageByDay,
  findHfoTransportByDay,
  findAllNotesByDay,
  checkTanksList,
  calculateTanksVolumes,
} = require('../utils');
const {
  Unit52Tank,
  Unit53Tank,
  Unit90Tank,
  Unit54Storage,
  SolidSulphurProduction,
} = require('../models');

exports.getReportByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const report = {};
    // STORE
    const u52T = await findAllTanksByDate(Unit52Tank, formattedDate);
    const u52Tanks = await checkTanksList(u52T, 'u52');
    const u53T = await findAllTanksByDate(Unit53Tank, formattedDate);
    const u53Tanks = await checkTanksList(u53T, 'u53');
    const u90T = await findAllTanksByDate(Unit90Tank, formattedDate);
    const u90Tanks = await checkTanksList(u90T, 'u90');

    const sulphurStore = await findSolidSulphurStorageByDay(formattedDate);

    const allTanks = [...u52Tanks, ...u53Tanks, ...u90Tanks];

    const store = calculateTanksVolumes(allTanks);
    store.push({
      product: 'sulphur',
      pumpable: sulphurStore.actual_quantity,
      working_volume: sulphurStore.working_quantity,
    });
    report.store = store;

    // CRUDE OIL
    const { receiving, sending, w_v_m3, reservoir_m3, w_v_bbl, reservoir_bbl } =
      await findOilByDate(formattedDate);
    report.crudeOil = {
      receiving,
      sending,
      m3: { working_volume: w_v_m3, pumpable: reservoir_m3 },
      barrel: { working_volume: w_v_bbl, pumpable: reservoir_bbl },
    };

    // Natural Gas
    const { receiving_m3, receiving_mscf } = await findNaturalGasByDate(
      formattedDate
    );
    report.naturalGas = { m3: receiving_m3, mscf: receiving_mscf };

    // Blending
    const {
      lpg: lpgBlending,
      pg: pgBlending,
      rg: rgBlending,
      diesel: dieselBlending,
      hfo: hfoBlending,
    } = await findBlendingByDate(formattedDate);

    const sulphurProduction = await SolidSulphurProduction.findOne({
      where: { day: formattedDate },
      attributes: ['quantity'],
    });

    report.blending = {
      lpgBlending,
      pgBlending,
      rgBlending,
      dieselBlending,
      hfoBlending,
      sulphurProduction: sulphurProduction ? sulphurProduction.qquantity : 0,
    };

    const { pgPumping, rgPumping, dieselPumping, kerosenePumping } =
      await findAllPumpingByDate(formattedDate);

    report.pumping = {
      pgPumping: {
        ...pgPumping,
        total: pgPumping.toKarbala + pgPumping.toNajaf,
      },
      rgPumping: {
        ...rgPumping,
        total: rgPumping.toKarbala + rgPumping.toNajaf,
      },
      dieselPumping: {
        ...dieselPumping,
        total: dieselPumping.toKarbala + dieselPumping.toNajaf,
      },
      kerosenePumping: {
        ...kerosenePumping,
        total: kerosenePumping.toKarbala + kerosenePumping.toNajaf,
      },
    };

    const { lPGTransport, rGTransport, atkTransport } =
      await findLightTransportByDate(formattedDate);
    report.lightTransport = { lPGTransport, rGTransport, atkTransport };

    const pavingAsphaltTransport = await findPavingAsphaltTransportBayDate(
      formattedDate
    );
    report.pavingAsphaltTransport = pavingAsphaltTransport;

    const solidSulphurTransport = await findSolidSulphurTransportBayDate(
      formattedDate
    );
    report.solidSulphurTransport = solidSulphurTransport;

    const hfoTransport = [
      await findHfoTransportByDay('1', formattedDate),
      await findHfoTransportByDay('2', formattedDate),
      await findHfoTransportByDay('3', formattedDate),
    ];
    report.hfoTransport = hfoTransport;

    const notes = await findAllNotesByDay(formattedDate);
    report.notes = notes;

    res.json(report);
  } catch (error) {
    handleError(next, error.message, 500);
  }
};
