const { Unit53Tank, PavingAsphaltTransport, U53Note } = require('../../models');
const {
  validateInput,
  formatDate,
  handleError,
  findTanksByDate,
  checkAuthorization,
  findTankInfo,
  findTransport,
  findNotesByDate,
} = require('../../utils');

exports.getAllData = async (req, res, next) => {
  const { day } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);
  try {
    checkAuthorization(userData, 'u53', next);

    const unit53Data = {};

    let tanks = await findTanksByDate(Unit53Tank, formattedDate);
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
    unit53Data.tanks = tanks;

    let pavingAsphaltTransport = await findTransport(
      PavingAsphaltTransport,
      formattedDate
    );
    if (!pavingAsphaltTransport) {
      pavingAsphaltTransport = {};
    }
    unit53Data.pavingAsphaltTransport = pavingAsphaltTransport;

    let notes = await findNotesByDate(U53Note, formattedDate);
    if (!notes) {
      notes = [];
    }

    unit53Data.notes = notes;

    res.status(200).json(unit53Data);
  } catch (error) {
    console.log(error);
    handleError(next, error.message, 500);
  }
};
