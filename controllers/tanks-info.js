const { TanksInfo, HttpError } = require('../models');

const { allowedUpdateFields, findTankByTag } = require('../utils');

exports.getTankInfo = async (req, res, next) => {
  const { tag_number } = req.params;

  try {
    const tank = await findTankByTag(tag_number);
    if (!tank) {
      return next(
        new HttpError('Could not find a tank for the provided tag number.', 404)
      );
    }
    res.status(200).json({ tank });
  } catch (error) {
    console.error(
      `Error fetching tank info for tag number: ${tag_number}`,
      error
    );
    return next(
      new HttpError(
        'Something went wrong, could not retrieve tank info right now.',
        500
      )
    );
  }
};

exports.getAllTanksInfo = async (req, res, next) => {
  try {
    const tanks = await TanksInfo.findAll({
      where: { is_active: true },
      attributes: [
        'id',
        'tag_number',
        'product',
        'unit',
        'bottom',
        'working_volume',
      ],
    });

    if (!tanks || tanks.length === 0) {
      return next(new HttpError('Could not find any tanks.', 404));
    }

    res.status(200).json({ tanks });
  } catch (error) {
    console.error('Error fetching all tanks info', error);
    return next(
      new HttpError(
        'Something went wrong, could not retrieve tanks info right now.',
        500
      )
    );
  }
};

exports.updateTankInfo = async (req, res, next) => {
  const { tag_number } = req.params;
  const updatedData = req.body;

  if (!Object.keys(updatedData).length) {
    return next(new HttpError('No data provided for update.', 400));
  }

  try {
    const tank = await findTankByTag(tag_number);

    if (!tank) {
      return next(
        new HttpError('Could not find a tank for the provided tag number.', 404)
      );
    }

    for (let key in updatedData) {
      if (allowedUpdateFields.includes(key)) {
        tank[key] = updatedData[key];
      } else {
        return next(new HttpError(`Invalid field: ${key}`, 400));
      }
    }
    await tank.save();
    res.status(200).json({ message: 'The tank has been updated.' });
  } catch (error) {
    console.error(
      `Error updating tank info for tag number: ${tag_number}`,
      error
    );
    return next(
      new HttpError(
        'Something went wrong, could not update tank info right now.',
        500
      )
    );
  }
};

exports.updateAllTanksInfo = async (req, res, next) => {
  const updatedData = req.body; // Array of tanks to update

  if (!Array.isArray(updatedData) || updatedData.length === 0) {
    return next(new HttpError('No data provided for update.', 400));
  }

  try {
    const updatePromises = updatedData.map(async (tankData) => {
      const { tag_number } = tankData;
      const tank = await findTankByTag(tag_number);

      if (!tank) {
        throw new HttpError(
          `Could not find a tank for the provided tag number: ${tag_number}.`,
          404
        );
      }

      for (let key in tankData) {
        if (allowedUpdateFields.includes(key)) {
          tank[key] = tankData[key];
        } else if (key !== 'tag_number') {
          throw new HttpError(`Invalid field: ${key}`, 400);
        }
      }
      return tank.save();
    });

    await Promise.all(updatePromises);
    res.status(200).json({ message: 'All tanks have been updated.' });
  } catch (error) {
    console.error('Error updating multiple tanks info', error);
    if (error instanceof HttpError) {
      return next(error);
    }
    return next(
      new HttpError(
        'Something went wrong, could not update tanks info right now.',
        500
      )
    );
  }
};
