const {
  formatDate,
  checkAuthorization,
  findNaturalGasByDate,
  handleError,
  findNaturalGasByDateRange,
  deleteNaturalGas,
  addNaturalGasVolumes,
} = require('../../utils');

exports.getNaturalGasByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = formatDate(day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u52', next);
    const gasResult = await findNaturalGasByDate(formattedDate);

    if (!gasResult) {
      return handleError(
        next,
        'Could not find any Natural Gas results for this day.',
        404
      );
    }

    res.status(200).json(gasResult);
  } catch (error) {
    handleError(
      next,
      `Error fetching crude Natural Gas for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.getNaturalGasBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = formatDate(from);
  const endDate = formatDate(to);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u52', next);
    const gasResults = await findNaturalGasByDateRange(startDate, endDate);

    if (!gasResults || gasResults.length === 0) {
      return handleError(
        next,
        'There is no Natural Gas in this date range.',
        404
      );
    }

    res.status(200).json(gasResults);
  } catch (error) {
    handleError(
      next,
      `Error fetching Natural Gas quantities between ${from} and ${to}. Error: ${error.message}`
    );
  }
};

exports.addNaturalGas = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(data.day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u52', next);
    const existingVolumes = await findNaturalGasByDate(formattedDate);

    if (existingVolumes) {
      await deleteNaturalGas(formattedDate);
    }

    const gasVolumes = addNaturalGasVolumes({
      ...data,
      receiving_mscf: Math.round(data.receiving_mn3 / (1177 * 24)),
      day: formattedDate,
      userId: userData.id,
    });

    if (!gasVolumes) {
      return handleError(
        next,
        'Could not add Natural Gas Volumes at this time.',
        500
      );
    }

    res.status(201).json({
      message: 'The Natural Gas volumes have been successfully added.',
    });
  } catch (error) {
    handleError(
      next,
      `Error adding Natural Gas quantities. Error: ${error.message}`
    );
  }
};

exports.updateNaturalGas = async (req, res, next) => {
  const { day, items } = req.body;
  if (!day || !items) {
    return handleError(next, 'Missing required data: day and items.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u52', next);
    const gasResults = await findNaturalGasByDate(formattedDate);

    if (!gasResults) {
      return handleError(
        next,
        'Could not find any Natural Gas volumes result for this day.',
        404
      );
    }

    for (const item in items) {
      if (
        items.hasOwnProperty(item) &&
        gasResults[item] !== undefined &&
        item !== 'isConfirmed'
      ) {
        gasResults[item] = items[item];
      }
    }

    await gasResults.save();

    res.status(200).json({
      message: 'The Natural Gas volumes have been successfully updated.',
    });
  } catch (error) {
    handleError(
      next,
      `Error updating Natural Gas volumes. Error: ${error.message}`
    );
  }
};

exports.confirmGasVolumes = async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u52', next);
    const existingGas = await findNaturalGasByDate(formattedDate);

    if (!existingGas) {
      return handleError(
        next,
        'Could not find any natural gas volumes result for this day.',
        404
      );
    }

    existingGas.isConfirmed = true;
    await existingGas.save();
    res.status(200).json({
      message: 'The natural gas volumes have been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming natural gas volumes. Error: ${error.message}`
    );
  }
};
