const {
  formatDate,
  checkAuthorization,
  handleError,
  findCrudeOilByDate,
  findCrudeOilByDateRange,
  deleteCrudeOil,
  addCrudeOilVolumes,
} = require('../../utils');

exports.getCrudeOilByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const crudeOil = await findCrudeOilByDate(formattedDate);

    if (!crudeOil) {
      return handleError(
        next,
        'Could not find any oil result results for this day.',
        404
      );
    }

    res.status(200).json(crudeOil);
  } catch (error) {
    handleError(
      next,
      `Error fetching crude oil quantities for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.getCrudeOilBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = formatDate(from);
  const endDate = formatDate(to);
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const oilResults = await findCrudeOilByDateRange(startDate, endDate);

    if (!oilResults || oilResults.length === 0) {
      return handleError(
        next,
        'There is no crude oil quantities in this date range.',
        404
      );
    }

    res.status(200).json(oilResults);
  } catch (error) {
    handleError(
      next,
      `Error fetching crude oil quantities between ${from} and ${to}. Error: ${error.message}`
    );
  }
};

exports.addCrudeOil = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(data.day);
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const existingVolumes = await findCrudeOilByDate(formattedDate);

    if (existingVolumes) {
      await deleteCrudeOil(formattedDate);
    }

    const oilVolumes = await addCrudeOilVolumes({
      ...data,
      day: formattedDate,
      userId: userData.id,
    });
    if (!oilVolumes) {
      return handleError(next, 'Could not add oil Volumes at this time.', 500);
    }

    res.status(201).json({
      message: 'The crude oil volumes quantities have been successfully added.',
    });
  } catch (error) {
    handleError(
      next,
      `Error adding crude oil quantities. Error: ${error.message}`
    );
  }
};

exports.updateCrudeOil = async (req, res, next) => {
  const { day, items } = req.body;
  if (!day || !items) {
    return handleError(next, 'Missing required data: day and items.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const existingCrudeOil = await findCrudeOilByDate(formattedDate);
    if (!existingCrudeOil) {
      return handleError(
        next,
        'Could not find any oil volumes result for this day.',
        404
      );
    }

    for (const item in items) {
      if (
        items.hasOwnProperty(item) &&
        existingCrudeOil[item] !== undefined &&
        item !== 'isConfirmed'
      ) {
        existingCrudeOil[item] = items[item];
      }
    }

    await existingCrudeOil.save();
    res.status(200).json({
      message: 'The crude oil volumes have been successfully updated.',
    });
  } catch (error) {
    handleError(
      next,
      `Error updating crude oil volumes. Error: ${error.message}`
    );
  }
};

exports.confirmOilVolumes = async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u52', next);

  try {
    const existingCrudeOil = await findCrudeOilByDate(formattedDate);

    if (!existingCrudeOil) {
      return handleError(
        next,
        'Could not find any oil volumes result for this day.',
        404
      );
    }

    existingCrudeOil.isConfirmed = true;
    await existingCrudeOil.save();
    res.status(200).json({
      message: 'The crude oil volumes have been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming crude oil volumes. Error: ${error.message}`
    );
  }
};
