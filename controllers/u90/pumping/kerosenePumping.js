const moment = require('moment');
const { KerosenePumping } = require('../../../models');
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
    const pumping = await findPumping(KerosenePumping, formattedDate);

    if (!pumping) {
      return handleError(next, 'There is no Kerosene pumping on this date.');
    }
    res.status(200).json(pumping);
  } catch (error) {
    return handleError(
      next,
      `Error fetching Kerosene pumping on this date. Error: ${error.message}`
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
    const pumping = await findPumpingInDateRange(
      KerosenePumping,
      startDate,
      endDate
    );

    if (!pumping || pumping.length === 0) {
      return handleError(
        next,
        'There is no Kerosene pumping in this date range.'
      );
    }
    res.status(200).json(pumping);
  } catch (error) {
    return handleError(
      next,
      `Error fetching Kerosene pumping in this date range. Error: ${error.message}`
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
    const existingPumping = await findPumping(KerosenePumping, formattedDate);

    if (existingPumping) {
      return handleError(
        next,
        'The Kerosene pumping for this day already exists.',
        404
      );
    }

    const pumping = await createPumping(
      KerosenePumping,
      { ...data, day: formattedDate },
      userData.id
    );

    if (!pumping) {
      return handleError(
        next,
        'Could not add Kerosene pumping at this time.',
        500
      );
    }

    res
      .status(201)
      .json({ message: 'The Kerosene pumping has been successfully added.' });
  } catch (error) {
    return handleError(
      next,
      `Error adding Kerosene pumping on this date. Error: ${error.message}`
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
    const existingPumping = await findPumping(KerosenePumping, formattedDate);

    if (!existingPumping) {
      return handleError(
        next,
        'There is no Kerosene pumping for this day.',
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

    res
      .status(200)
      .json({ message: 'The Kerosene pumping has been successfully updated.' });
  } catch (error) {
    return handleError(
      next,
      `Error updating Kerosene pumping on this date. Error: ${error.message}`
    );
  }
};

exports.confirmKerosenePumping = async (req, res, next) => {
  const { day } = req.body;
  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }
  const formattedDate = moment(day, 'DD-MM-YYYY').toDate();
  const { userData } = req;

  checkAuthorization(userData, 'u90', next);

  try {
    const isConfirmed = await confirmPumping(
      KerosenePumping,
      formattedDate,
      next
    );

    if (isConfirmed) {
      return res
        .status(200)
        .json({ message: 'Kerosene pumping has been successfully confirmed.' });
    }
  } catch (error) {
    return handleError(
      next,
      `Error confirming Kerosene pumping on this date. Error: ${error.message}`
    );
  }
};
