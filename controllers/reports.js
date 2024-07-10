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
    const u52Tanks = await findAllTanksByDate(Unit52Tank, formattedDate);
    const u53Tanks = await findAllTanksByDate(Unit53Tank, formattedDate);
    const u90Tanks = await findAllTanksByDate(Unit90Tank, formattedDate);

    const sulphurStore = await Unit54Storage.findOne({
      where: { day: formattedDate },
      attributes: ['day', 'working_quantity', 'actual_quantity'],
    });

    const allTanks = [...u52Tanks, ...u53Tanks, ...u90Tanks];

    // Initialize a result object
    const result = {};

    // Iterate through the combined array
    allTanks.forEach((item) => {
      const { product, pumpable, working_volume } = item;

      if (!result[product]) {
        result[product] = { product, pumpable: 0, working_volume: 0 };
      }

      result[product].pumpable += pumpable;
      result[product].working_volume += working_volume;
    });

    // Convert the result object to an array
    const store = Object.values(result);
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

    const { quantity: sulphurProduction } =
      await SolidSulphurProduction.findOne({
        where: { day: formattedDate },
        attributes: ['quantity'],
      });

    report.blending = {
      lpgBlending,
      pgBlending,
      rgBlending,
      dieselBlending,
      hfoBlending,
      sulphurProduction,
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

    res.json(report);
  } catch (error) {
    handleError(next, error.message, 500);
  }
};
