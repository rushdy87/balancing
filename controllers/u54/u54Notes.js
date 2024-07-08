const { U54Note } = require('../../models');

const {
  formatDate,
  validateInput,
  checkAuthorization,
  handleError,
  findNotesByDate,
  addNote,
  editNote,
  destroyNote,
} = require('../../utils');

exports.getNotesByDate = async (req, res, next) => {
  const { day } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);
  checkAuthorization(userData, 'u54', next);

  try {
    const notes = await findNotesByDate(U54Note, formattedDate);

    if (!notes || notes.length === 0) {
      return handleError(next, `there is no notes in Unit 54 on: ${day}.`, 404);
    }

    res.status(200).json(notes);
  } catch (error) {
    handleError(next, `Error fetching notes for day: ${day}.`, 500);
  }
};

exports.addOneNote = async (req, res, next) => {
  const { day, note } = req.body;
  const { userData } = req;

  if (!validateInput(req.body, ['day', 'note'], next)) return;

  const formattedDate = formatDate(day);
  checkAuthorization(userData, 'u54', next);

  try {
    await addNote(U54Note, { note, day: formattedDate, userId: userData.id });

    res.status(201).json({ message: 'The note has been added.' });
  } catch (error) {
    console.log(error.message);
    handleError(
      next,
      'Something went wrong, could not add tank volumes right now.',
      500
    );
  }
};

exports.addNotesByDay = async (req, res, next) => {
  const { day, notes } = req.body;
  const { userData } = req;

  if (!validateInput(req.body, ['day', 'notes'], next)) return;

  const formattedDate = formatDate(day);
  checkAuthorization(userData, 'u54', next);

  try {
    const createPromises = notes.map(
      async (note) =>
        await addNote(U54Note, {
          note,
          day: formattedDate,
          userId: userData.id,
        })
    );
    await Promise.all(createPromises);
    res.status(201).json({ message: 'The notes have been added.' });
  } catch (error) {
    console.log(error.message);
    handleError(
      next,
      'Something went wrong, could not add tank volumes right now.',
      500
    );
  }
};

exports.updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { note } = req.body;
  const { userData } = req;

  if (!validateInput(req.body, ['note'], next)) return;

  checkAuthorization(userData, 'u54', next);

  try {
    const updatedNote = await editNote(U54Note, id, note);

    if (!updatedNote) {
      return handleError(next, 'Could not find a note with this id.', 404);
    }

    res.status(200).json({ message: 'The note has been updated.' });
  } catch (error) {
    console.log(error.message);
    handleError(
      next,
      'Something went wrong, could not update the note right now.',
      500
    );
  }
};

exports.deleteNote = async (req, res, next) => {
  const { id } = req.params;

  const { userData } = req;

  checkAuthorization(userData, 'u54', next);

  try {
    const deletionResult = await destroyNote(U54Note, id);
    if (!deletionResult) {
      return res
        .status(404)
        .json({ message: 'Could not find a note with this id.' });
    }

    res.status(200).json({ message: 'The note has been deleted.' });
  } catch (error) {
    console.log(error.message);
    handleError(
      next,
      'Something went wrong, could not delete the note right now.',
      500
    );
  }
};
