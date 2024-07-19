const { SolidSulphurTransport } = require('../../models');
const {
  formatDate,
  checkAuthorization,
  findTransport,
  handleError,
  findTransportInDateRange,
  deleteTransport,
  createTransport,
} = require('../../utils');

exports.getSolidSulphurTransportbyDay = async (req, res, next) => {
  const { day } = req.params;
  const formattedDate = formatDate(day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u54', next);
    const transport = await findTransport(SolidSulphurTransport, formattedDate);

    if (!transport) {
      return handleError(
        next,
        'Could not find any Solid Sulphur Transport for this day.',
        404
      );
    }

    res.status(200).json(transport);
  } catch (error) {
    handleError(
      next,
      `Error fetching Solid Sulphur Transport quantities for day: ${day}. Error: ${error.message}`
    );
  }
};

exports.getSolidSulphurTransportBetweenTwoDates = async (req, res, next) => {
  const { from, to } = req.params;
  if (!from || !to) {
    return handleError(next, 'Missing required parameters: from and to.', 400);
  }

  const startDate = formatDate(from);
  const endDate = formatDate(to);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u54', next);
    const transport = await findTransportInDateRange(
      SolidSulphurTransport,
      startDate,
      endDate
    );

    if (!transport || transport.length === 0) {
      return handleError(
        next,
        'There is no Solid Sulphur Transport  in this date range.',
        404
      );
    }
    res.status(200).json(transport);
  } catch (error) {
    handleError(
      next,
      `Error fetching Solid Sulphur Transport quantities between ${from} and ${to}. Error: ${error.message}`
    );
  }
};

exports.addSolidSulphurTransport = async (req, res, next) => {
  const data = req.body;
  if (!data || !data.day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(data.day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u54', next);
    const existingTransport = await findTransport(
      SolidSulphurTransport,
      formattedDate
    );

    if (existingTransport) {
      await deleteTransport(SolidSulphurTransport, formattedDate);
    }

    const transport = await createTransport(SolidSulphurTransport, {
      ...data,
      day: formattedDate,
      userId: userData.id,
    });

    if (!transport) {
      return handleError(
        next,
        'Could not add Solid Sulphur Transport at this time.',
        500
      );
    }

    res.status(201).json({
      message:
        'The Solid Sulphur Transport quantities have been successfully added.',
    });
  } catch (error) {
    handleError(
      next,
      `Error fetching Solid Sulphur Transport quantities for day: ${data.day}. Error: ${error.message}`
    );
  }
};

exports.updateSolidSulphurTransport = async (req, res, next) => {
  const { day, items } = req.body;
  if (!day || !items) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u54', next);
    const existingTransport = await findTransport(
      SolidSulphurTransport,
      formattedDate
    );

    if (!existingTransport) {
      return handleError(
        next,
        'There is no Solid Sulphur Transport for this date.',
        404
      );
    }

    for (const item in items) {
      if (
        items.hasOwnProperty(item) &&
        existingTransport[item] !== undefined &&
        item !== 'isConfirmed'
      ) {
        existingTransport[item] = items[item];
      }
    }

    await existingTransport.save();

    res.status(200).json({
      message:
        'The Solid Sulphur Transport quantities have been successfully updated.',
    });
  } catch (error) {
    handleError(
      next,
      `Error updating Solid Sulphur Transport quantities for day: ${data.day}. Error: ${error.message}`
    );
  }
};

exports.confirmeSolidSulphurTransport = async (req, res, next) => {
  const { day } = req.body;

  if (!day) {
    return handleError(next, 'Missing required data: day.', 400);
  }

  const formattedDate = formatDate(day);
  const { userData } = req;

  try {
    checkAuthorization(userData, 'u54', next);
    const existingTransport = await findTransport(
      SolidSulphurTransport,
      formattedDate
    );
    if (!existingTransport) {
      return handleError(
        next,
        'There is no Solid Sulphur Transport for this date.',
        404
      );
    }
    existingTransport.isConfirmed = true;

    await existingTransport.save();
    res.status(200).json({
      message: 'Solid Sulphur Transport has been successfully confirmed.',
    });
  } catch (error) {
    handleError(
      next,
      `Error confirming Solid Sulphur Transportquantities for day: ${day}. Error: ${error.message}`
    );
  }
};
