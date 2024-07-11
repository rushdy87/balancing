const { U52Note, U53Note, U54Note, U90Note } = require('../models');

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

const destroyNote = async (module, id) => {
  const note = await module.findByPk(id);
  if (!note) return null;
  await module.destroy({ where: { id } });
  return note;
};

const findAllNotesByDay = async (day) => {
  const u52Notes = await U52Note.findAll({
    where: { day },
    attributes: ['note'],
  });
  const u53Notes = await U53Note.findAll({
    where: { day },
    attributes: ['note'],
  });
  const u54Notes = await U54Note.findAll({
    where: { day },
    attributes: ['note'],
  });
  const u90Notes = await U90Note.findAll({
    where: { day },
    attributes: ['note'],
  });

  return [...u52Notes, ...u53Notes, ...u54Notes, ...u90Notes];
};
module.exports = {
  findNotesByDate,
  addNote,
  editNote,
  destroyNote,
  findAllNotesByDay,
};
