const { Unit53Tank } = require('../../models');

const {
  handleError,
  checkAuthorization,
  findAllTanksByDate,
  findTankByDate,
  findTankByDateRange,
  findAllTanksByDateRange,
  findTankInfo,
  addTankData,
  countTanksByDate,
  editTank,
  confirmTank,
  validateInput,
  formatDate,
} = require('../../utils');

// Controller to get all tanks by day
exports.getAllTanksByDay = async (req, res, next) => {
  const { day } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);
  checkAuthorization(userData, 'u53', next);

  try {
    const tanks = await findAllTanksByDate(Unit53Tank, formattedDate);
    if (!tanks || tanks.length === 0) {
      return handleError(next, 'Could not find any tanks.', 404);
    }
    res.status(200).json(tanks);
  } catch (error) {
    handleError(next, `Error fetching tanks for day: ${day}.`, 500);
  }
};

// Controller to get a tank by day
exports.getTankByDay = async (req, res, next) => {
  const { tag_number, day } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['tag_number', 'day'], next)) return;

  const formattedDate = formatDate(day);
  checkAuthorization(userData, 'u53', next);

  try {
    const tank = await findTankByDate(Unit53Tank, tag_number, formattedDate);
    if (!tank) {
      return handleError(
        next,
        `Could not find a tank for tag number: ${tag_number} on date: ${day}.`,
        404
      );
    }
    res.status(200).json(tank);
  } catch (error) {
    handleError(next, `Error fetching tank ${tag_number} on ${day}.`, 500);
  }
};

// Controller to get all tanks between two dates
exports.getAllTanksBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['from', 'to'], next)) return;

  const startDate = formatDate(from);
  const endDate = formatDate(to);
  checkAuthorization(userData, 'u53', next);

  try {
    const tanks = await findAllTanksByDateRange(Unit53Tank, startDate, endDate);
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

// Controller to get a tank between two dates
exports.getTankBetweenTwoDates = async (req, res, next) => {
  const { tag_number, from, to } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['tag_number', 'from', 'to'], next)) return;

  const startDate = formatDate(from);
  const endDate = formatDate(to);
  checkAuthorization(userData, 'u53', next);

  try {
    const tanks = await findTankByDateRange(
      Unit53Tank,
      tag_number,
      startDate,
      endDate
    );
    if (!tanks || tanks.length === 0) {
      return handleError(
        next,
        `Could not find any tanks for tag number: ${tag_number} between dates: ${from} and ${to}.`,
        404
      );
    }
    res.status(200).json(tanks);
  } catch (error) {
    handleError(
      next,
      `Error fetching tanks ${tag_number} between dates: ${from} and ${to}.`,
      500
    );
  }
};

// Controller to add volume to tanks
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
      return handleError(next, `There is already tanks data for ${day}.`, 400);
    }

    const createPromises = Object.keys(tanksData).map(async (tag_number) => {
      const { working_volume, low_level, high_level, product } =
        await findTankInfo(tag_number);

      const tankVolume = tanksData[tag_number];
      const pumpable = tankVolume === 0 ? tankVolume : tankVolume - low_level;

      if (pumpable > high_level || pumpable < 0) {
        return handleError(
          next,
          `The pumpable volume for tank ${tag_number} is out of the range.`,
          500
        );
      }

      return addTankData(Unit53Tank, {
        tag_number,
        day: formattedDate,
        product,
        pumpable,
        working_volume,
        userId: userData.id,
      });
    });

    await Promise.all(createPromises);
    res
      .status(201)
      .json({ message: 'All tanks pumpable volumes have been added.' });
  } catch (error) {
    handleError(
      next,
      'Something went wrong, could not add tank volumes right now.',
      500
    );
  }
};

// Controller to add volume to one tank
exports.addVolumeToOneTank = async (req, res, next) => {
  const { tag_number, tov, day } = req.body;
  const { userData } = req;

  if (!validateInput(req.body, ['tag_number', 'tov', 'day'], next)) return;

  const formattedDate = formatDate(day);
  checkAuthorization(userData, 'u53', next);

  try {
    const { working_volume, low_level, high_level, product } =
      await findTankInfo(tag_number);

    const pumpable = tov === 0 ? tov : tov - low_level;

    if (pumpable > high_level || pumpable < 0) {
      return handleError(
        next,
        `The pumpable volume for tank ${tag_number} is out of the range.`,
        500
      );
    }

    await addTankData(Unit53Tank, {
      tag_number,
      day: formattedDate,
      product,
      pumpable,
      working_volume,
      userId: userData.id,
    });

    res.status(201).json({ message: 'Tank volume has been added.' });
  } catch (error) {
    handleError(
      next,
      'Something went wrong, could not add tank volumes right now.',
      500
    );
  }
};

// Controller to update one tank volume
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
  checkAuthorization(userData, 'u53', next);

  try {
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
      Unit53Tank,
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

    res.status(200).json({ message: 'The tank volume has been updated.' });
  } catch (error) {
    handleError(
      next,
      'Something went wrong, could not update tank volumes right now.',
      500
    );
  }
};

// Controller to confirm tank volume
exports.confirmTankVolume = async (req, res, next) => {
  const { tag_number, day } = req.body;
  const { userData } = req;

  if (!validateInput(req.body, ['tag_number', 'day'], next)) return;

  const formattedDate = formatDate(day);
  checkAuthorization(userData, 'u53', next);

  try {
    const confirmedTank = await confirmTank(
      Unit53Tank,
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
