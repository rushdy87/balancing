const moment = require('moment');
const { RGPumping } = require('../../../models');
const { checkAuthorization } = require('../../../utils/authorization');
const {
  findPumping,
  findPumpingInDateRange,
  createPumping,
  confirmPumping,
} = require('../../../utils/pumping');
const { handleError } = require('../../../utils');

exports.getPumpingByDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const pumping = await findPumping(RGPumping, formattedDate);

    if (!pumping) {
      return handleError(next, 'There is no RG pumping on this date.');
    }
    res.status(200).json(pumping);
  } catch (error) {
    return handleError(
      next,
      `Error fetching RG pumping on this date. Error: ${error.message}`
    );
  }
};

exports.getPumpingBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = moment(from, 'DD-MM-YYYY').toDate();
  const endDate = moment(to, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const pumping = await findPumpingInDateRange(RGPumping, startDate, endDate);

    if (!pumping || pumping.length === 0) {
      return handleError(next, 'There is no RG pumping in this date range.');
    }
    res.status(200).json(pumping);
  } catch (error) {
    return handleError(
      next,
      `Error fetching RG pumping in this date range. Error: ${error.message}`
    );
  }
};

exports.addPumping = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = moment(data.day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingPumping = await findPumping(RGPumping, formattedDate);

    if (existingPumping) {
      return handleError(
        next,
        'The RG pumping for this day already exists.',
        404
      );
    }

    const pumping = await createPumping(
      RGPumping,
      { ...data, day: formattedDate },
      userData.id
    );

    if (!pumping) {
      return handleError(next, 'Could not add RG pumping at this time.', 500);
    }

    res
      .status(201)
      .json({ message: 'The RG pumping has been successfully added.' });
  } catch (error) {
    return handleError(
      next,
      `Error adding RG pumping on this date. Error: ${error.message}`
    );
  }
};

exports.updatePumping = async (req, res, next) => {
  const { day, items } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const existingPumping = await findPumping(RGPumping, formattedDate);

    if (!existingPumping) {
      return handleError(next, 'There is no RG pumping for this day.', 404);
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

    res
      .status(200)
      .json({ message: 'The RG pumping has been successfully updated.' });
  } catch (error) {
    return handleError(
      next,
      `Error updating RG pumping on this date. Error: ${error.message}`
    );
  }
};

exports.confirmRGPumping = async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const isConfirmed = await confirmPumping(RGPumping, formattedDate, next);

    if (isConfirmed) {
      return res
        .status(200)
        .json({ message: 'RG pumping has been successfully confirmed.' });
    }
  } catch (error) {
    return handleError(
      next,
      `Error confirming RG pumping on this date. Error: ${error.message}`
    );
  }
};
