const { DieselPumping } = require('../../../models');
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
    const pumping = await findPumping(DieselPumping, formattedDate);

    if (!pumping) {
      return handleError(next, 'There is no diesel pumping on this date.');
    }
    res.status(200).json(pumping);
  } catch (error) {
    return handleError(
      next,
      `Error fetching diesel pumping on this date. Error: ${error.message}`
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
    const pumping = await findPumpingInDateRange(
      DieselPumping,
      startDate,
      endDate
    );

    if (!pumping || pumping.length === 0) {
      return handleError(
        next,
        'There is no diesel pumping in this date range.'
      );
    }
    res.status(200).json(pumping);
  } catch (error) {
    return handleError(
      next,
      `Error fetching diesel pumping in this date range. Error: ${error.message}`
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
    const existingPumping = await findPumping(DieselPumping, formattedDate);

    if (existingPumping) {
      await deletePumping(DieselPumping, formattedDate);
    }

    const pumping = await createPumping(DieselPumping, {
      ...data,
      day: formattedDate,
      userId: userData.id,
    });

    if (!pumping) {
      return handleError(
        next,
        'Could not add diesel pumping at this time.',
        500
      );
    }

    res.status(201).json({
      message: 'The diesel pumping has been successfully added.',
    });
  } catch (error) {
    return handleError(
      next,
      `Error adding diesel pumping on this date. Error: ${error.message}`
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
    const existingPumping = await findPumping(DieselPumping, formattedDate);

    if (!existingPumping) {
      return handleError(next, 'There is no diesel pumping for this day.', 404);
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
      message: 'The diesel pumping has been successfully updated.',
    });
  } catch (error) {
    return handleError(
      next,
      `Error updating diesel pumping on this date. Error: ${error.message}`
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
    const existingPumping = await findPumping(DieselPumping, formattedDate);

    if (!existingPumping) {
      return handleError(next, 'There is no diesel pumping for this day.', 404);
    }
    existingPumping.isConfirmed = true;
    await existingPumping.save();

    return res.status(200).json({
      message: 'diesel pumping has been successfully confirmed.',
    });
  } catch (error) {
    return handleError(
      next,
      `Error confirming diesel pumping on this date. Error: ${error.message}`
    );
  }
};
