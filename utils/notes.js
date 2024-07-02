const findNotesByDate = async (model, day) => {
  return await model.findAll({
    where: { day },
    attributes: ['id', 'day', 'note'],
  });
};

module.exports = { findNotesByDate };
