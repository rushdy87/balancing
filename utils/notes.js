const findNotesByDate = async (model, day) => {
  return await model.findAll({
    where: { day },
    attributes: ['id', 'day', 'note'],
  });
};

const addNote = async (model, data) => {
  return await model.create(data);
};

const editNote = async (module, id, note) => {
  const exsitingNote = await module.findByPk(id);

  if (!exsitingNote) return null;

  exsitingNote.note = note;

  await exsitingNote.save();

  return exsitingNote;
};

module.exports = { findNotesByDate, addNote, editNote };
