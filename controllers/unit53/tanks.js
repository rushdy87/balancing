const { Unit53Tank } = require('../../models');
const {
  formatDate,
  validateInput,
  checkAuthorization,
  handleError,
  findTanksByDate,
  countTanksByDate,
  findTanksByDateRange,
  deleteTanksVolumes,
  tanksDataFormatting,
  addTankData,
} = require('../../utils');

exports.getTanksByDay = async (req, res, next) => {
  const { day } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);
  checkAuthorization(userData, 'u52', next);

  try {
    const tanks = await findTanksByDate(Unit53Tank, formattedDate);
    if (!tanks || tanks.length === 0) {
      return handleError(next, 'Could not find any tanks.', 404);
    }
    res.status(200).json(tanks);
  } catch (error) {
    handleError(next, `Error fetching tanks for day: ${day}.`, 500);
  }
};

exports.getTanksBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['from', 'to'], next)) return;

  const startDate = formatDate(from);
  const endDate = formatDate(to);
  checkAuthorization(userData, 'u53', next);

  try {
    const tanks = await findTanksByDateRange(Unit53Tank, startDate, endDate);

    if (!tanks || tanks.length === 0) {
      return handleError(next, 'Could not find any tanks.', 404);
    }
    res.status(200).json(tanks);
  } catch (error) {
    handleError(
      next,
      `Error fetching tanks between dates: ${from} and ${to}.`,
      500
    );
  }
};

exports.addVolumeToTanks = async (req, res, next) => {
  const { day, tanks: tanksData } = req.body;
  const { userData } = req;

  if (!validateInput(req.body, ['day', 'tanks'], next)) return;

  if (typeof tanksData !== 'object')
    return handleError(
      next,
      'Invalid input data: tanks should be an object.',
      400
    );

  const formattedDate = formatDate(day);
  checkAuthorization(userData, 'u53', next);

  try {
    const existingTanksCount = await countTanksByDate(
      Unit53Tank,
      formattedDate
    );
    if (existingTanksCount > 0) {
      await deleteTanksVolumes(Unit53Tank, formattedDate);
    }

    const tanks = await tanksDataFormatting(tanksData);

    const createPromises = tanks.map((tank) => {
      return addTankData(Unit53Tank, {
        tag_number: tank.tag_number,
        day: formattedDate,
        product: tank.product,
        pumpable: tank.pumpable,
        working_volume: tank.working_volume,
        userId: userData.id,
      });
    });

    await Promise.all(createPromises);
    res
      .status(201)
      .json({ message: 'All tanks pumpable volumes have been added.' });
  } catch (error) {
    console.log(error);
    handleError(next, error.message, 500);
  }
};
