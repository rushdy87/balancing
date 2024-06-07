const { TanksInfo, HttpError } = require('../models');

exports.getTankInfo = async (req, res, next) => {
  const { tag_number } = req.params;
  console.log(tag_number);

  try {
    const tank = await TanksInfo.findOne({
      where: { tag_number, is_active: true },
      attributes: [
        'id',
        'tag_number',
        'product',
        'unit',
        'bottom',
        'working_volume',
      ],
    });

    if (!tank) {
      return next(
        new HttpError('Could not find a tank for the provided tag number.', 404)
      );
    }
    res.status(200).json({ tank });
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not find a place right now.',
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
      return next(new HttpError('Could not find any tank.', 404));
    }

    res.status(200).json({ tanks });
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not find a place right now.',
        500
      )
    );
  }
};

exports.updateTankInfo = async (req, res, next) => {
  const { tag_number } = req.params;
  const updatedData = req.body;
  if (Object.keys(updatedData).length === 0) {
    return next(new HttpError('There is no data to update!', 404));
  }

  try {
    const tank = await TanksInfo.findOne({
      where: { tag_number },
    });

    if (!tank) {
      return next(
        new HttpError('Could not find a tank for the provided tag number.', 404)
      );
    }
    for (let key in updatedData) {
      if (['bottom', 'working_volume', 'is_active'].includes(key)) {
        tank[key] = updatedData[key];
      } else {
        return next(
          new HttpError(`There is no column with name ${key}! `, 404)
        );
      }
    }
    await tank.save();
    res.status(200).json({ message: 'The tank is updated' });
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not find a place right now.',
        500
      )
    );
  }
};

exports.updateAllTanksInfo = async (req, res, next) => {
  const updatedData = req.body; // [{tag_number: "", ...},{..}, {..}]

  if (updatedData.length === 0) {
    return next(new HttpError('There is no data to update!', 404));
  }
  try {
    updatedData.forEach(async (tank) => {
      const existingTank = await TanksInfo.findOne({
        where: { tag_number: tank.tag_number },
      });
      if (!existingTank) {
        return next(
          new HttpError(
            'Could not find a tank for the provided tag number.',
            404
          )
        );
      }
      for (let key in tank) {
        if (['bottom', 'working_volume', 'is_active'].includes(key)) {
          existingTank[key] = tank[key];
        } else if (key === 'tag_number') {
          continue;
        } else {
          return next(
            new HttpError(`There is no column with name ${key}! `, 404)
          );
        }
      }
      await existingTank.save();
    });

    res.status(200).json({ message: 'All tanks are updated' });
  } catch (error) {
    return next(
      new HttpError(
        'Something went wrong, could not find a place right now.',
        500
      )
    );
  }
};
