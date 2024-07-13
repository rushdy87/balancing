const { Unit52Tank, Unit53Tank, Unit90Tank } = require('../../models');
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
} = require('../../utils');

exports.getReportByDay = async (req, res, next) => {
  const { day } = req.params;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);

  const { userData } = req;

  // This is not need unit!
  checkAuthorization(userData, 'u90', next);

  try {
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
    report.blending = blending;

    const crudeOil = await findCrudeOilByDateForReport(formattedDate);

    report.crudeOil = crudeOil;

    res.status(200).json(report);
  } catch (error) {
    handleError(next, error.message, 500);
  }
};
