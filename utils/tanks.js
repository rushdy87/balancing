const { handleError } = require('./index');

const findTanksByDate = async (model, day) => {
  return await model.findAll({ where: { day } });
};

const confiremTank = async (model, tag_number, day) => {
  const tank = await model.findOne({
    where: { tag_number, day },
  });

  if (!tank) {
    return handleError(
      next,
      'Could not find a tank for the provided tag number and this date.',
      404
    );
  }

  tank.isConfirmed = true;

  await tank.save();
};

module.exports = {
  findTanksByDate,
  confiremTank,
};
