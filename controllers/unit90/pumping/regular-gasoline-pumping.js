const { RGPumping } = require('../../../models');
const {
  formatDate,
  findPumping,
  checkAuthorization,
  handleError,
  findPumpingInDateRange,
  deletePumping,
  createPumping,
} = require('../../../utils');

exports.getPumpingByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const pumping = await findPumping(RGPumping, formattedDate);

    if (!pumping) {
      return handleError(
        next,
        'There is no regular gasoline pumping on this date.'
      );
    }
    res.status(200).json(pumping);
  } catch (error) {
    return handleError(
      next,
      `Error fetching regular gasoline pumping on this date. Error: ${error.message}`
    );
  }
};

exports.getPumpingBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = formatDate(from);
  const endDate = formatDate(to);
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const pumping = await findPumpingInDateRange(RGPumping, startDate, endDate);

    if (!pumping || pumping.length === 0) {
      return handleError(
        next,
        'There is no regular gasoline pumping in this date range.'
      );
    }
    res.status(200).json(pumping);
  } catch (error) {
    return handleError(
      next,
      `Error fetching regular gasoline pumping in this date range. Error: ${error.message}`
    );
  }
};

exports.addPumping = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = formatDate(data.day);
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingPumping = await findPumping(RGPumping, formattedDate);

    if (existingPumping) {
      await deletePumping(RGPumping, formattedDate);
    }

    const pumping = await createPumping(RGPumping, {
      ...data,
      day: formattedDate,
      userId: userData.id,
    });

    if (!pumping) {
      return handleError(
        next,
        'Could not add regular gasoline pumping at this time.',
        500
      );
    }

    res.status(201).json({
      message: 'The regular gasoline pumping has been successfully added.',
    });
  } catch (error) {
    return handleError(
      next,
      `Error adding regular gasoline pumping on this date. Error: ${error.message}`
    );
  }
};

exports.updatePumping = async (req, res, next) => {
  const { day, items } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingPumping = await findPumping(RGPumping, formattedDate);

    if (!existingPumping) {
      return handleError(
        next,
        'There is no regular gasoline pumping for this day.',
        404
      );
    }

    for (const item in items) {
      if (
        items.hasOwnProperty(item) &&
        existingPumping[item] !== undefined &&
        item !== 'isConfirmed'
      ) {
        existingPumping[item] = items[item];
      }
    }

    await existingPumping.save();

    res.status(200).json({
      message: 'The regular gasoline pumping has been successfully updated.',
    });
  } catch (error) {
    return handleError(
      next,
      `Error updating regular gasoline pumping on this date. Error: ${error.message}`
    );
  }
};

exports.confirmPumping = async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = formatDate(day);
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingPumping = await findPumping(RGPumping, formattedDate);

    if (!existingPumping) {
      return handleError(
        next,
        'There is no regular gasoline pumping for this day.',
        404
      );
    }
    existingPumping.isConfirmed = true;
    await existingPumping.save();

    return res.status(200).json({
      message: 'regular gasoline pumping has been successfully confirmed.',
    });
  } catch (error) {
    return handleError(
      next,
      `Error confirming regular gasoline pumping on this date. Error: ${error.message}`
    );
  }
};
