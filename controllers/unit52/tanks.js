const { Unit52Tank } = require('../../models');
const {
  formatDate,
  validateInput,
  checkAuthorization,
  handleError,
  findTanksByDate,
  deleteTanksVolumes,
  addTankData,
  tanksDataFormatting,
  countTanksByDate,
  findTanksByDateRange,
  findTankInfo,
  editTank,
  confirmTank,
} = require('../../utils');

exports.getTanksByDay = async (req, res, next) => {
  const { day } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);

  try {
    checkAuthorization(userData, 'u52', next);
    const tanks = await findTanksByDate(Unit52Tank, formattedDate);
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

  try {
    checkAuthorization(userData, 'u52', next);
    const tanks = await findTanksByDateRange(Unit52Tank, startDate, endDate);

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

  try {
    checkAuthorization(userData, 'u52', next);
    const existingTanksCount = await countTanksByDate(
      Unit52Tank,
      formattedDate
    );
    if (existingTanksCount > 0) {
      await deleteTanksVolumes(Unit52Tank, formattedDate);
    }

    const tanks = await tanksDataFormatting(tanksData);

    const createPromises = tanks.map((tank) => {
      return addTankData(Unit52Tank, {
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

exports.updateOneTankVolume = async (req, res, next) => {
  const { tag_number, day } = req.params;
  const { tov } = req.body;
  const { userData } = req;

  if (
    !validateInput(req.params, ['tag_number', 'day'], next) ||
    !validateInput(req.body, ['tov'], next)
  )
    return;

  const formattedDate = formatDate(day);

  try {
    checkAuthorization(userData, 'u52', next);
    const { low_level, high_level } = await findTankInfo(tag_number);

    const pumpable = tov === 0 ? tov : tov - low_level;

    if (pumpable > high_level || pumpable < 0) {
      return handleError(
        next,
        `The pumpable volume for tank ${tag_number} is out of the range.`,
        500
      );
    }

    const updatedTank = await editTank(
      Unit52Tank,
      tag_number,
      formattedDate,
      pumpable
    );
    if (!updatedTank) {
      return handleError(
        next,
        `Could not find a tank for tag number: ${tag_number} on date: ${day}.`,
        404
      );
    }

    console.log(updatedTank);

    res.status(200).json({ message: 'The tank volume has been updated.' });
  } catch (error) {
    console.log(error.message);
    handleError(
      next,
      'Something went wrong, could not update tank volumes right now.',
      500
    );
  }
};

exports.confirmTankVolume = async (req, res, next) => {
  const { tag_number, day } = req.body;
  const { userData } = req;

  if (!validateInput(req.body, ['tag_number', 'day'], next)) return;

  const formattedDate = formatDate(day);

  try {
    checkAuthorization(userData, 'u52', next);

    const confirmedTank = await confirmTank(
      Unit52Tank,
      tag_number,
      formattedDate
    );
    if (!confirmedTank) {
      return handleError(
        next,
        `Could not find a tank for tag number: ${tag_number} on date: ${day}.`,
        404
      );
    }

    res.status(200).json({ message: 'The tank volume has been confirmed.' });
  } catch (error) {
    handleError(
      next,
      'Something went wrong, could not confirm tank volumes right now.',
      500
    );
  }
};
