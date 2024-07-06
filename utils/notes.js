const findNotesByDate = async (model, day) => {
  return await model.findAll({
    where: { day },
    attributes: ['id', 'day', 'note'],
  });
};

const addNote = async (model, data) => {
  return await model.create(data);
};

module.exports = { findNotesByDate, addNote };
