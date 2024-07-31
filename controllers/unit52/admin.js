const { Unit52Tank } = require('../../models');
const {
  validateInput,
  formatDate,
  handleError,
  findTanksByDate,
  checkAuthorization,
  findCrudeOilByDate,
  findNaturalGasByDate,
  findBlendingByDate,
  findTankInfo,
} = require('../../utils');

exports.getAllData = async (req, res, next) => {
  const { day } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);
  try {
    checkAuthorization(userData, 'u52', next);

    const unit52Data = {};

    let tanks = await findTanksByDate(Unit52Tank, formattedDate);
    if (!tanks) {
      tanks = [];
    } else {
      tanks = await Promise.all(
        tanks.map(async (tank) => {
          const { low_level } = await findTankInfo(tank.tag_number);
          const tov = tank.pumpable + low_level;
          return {
            tag_number: tank.tag_number,
            product: tank.product,
            tov,
            day: tank.day,
            isConfirmed: tank.isConfirmed,
          };
        })
      );
    }
    unit52Data.tanks = tanks;

    let crudeOil = await findCrudeOilByDate(formattedDate);
    if (!crudeOil) {
      crudeOil = {};
    }
    unit52Data.crudeOil = crudeOil;

    let naturalGas = await findNaturalGasByDate(formattedDate);
    if (!naturalGas) {
      naturalGas = {};
    }
    unit52Data.naturalGas = naturalGas;

    let blending = await findBlendingByDate(formattedDate);
    if (!blending) {
      blending = {};
    }
    unit52Data.blending = blending;

    res.status(200).json(unit52Data);
  } catch (error) {
    console.log(error);
    handleError(next, error.message, 500);
  }
};
