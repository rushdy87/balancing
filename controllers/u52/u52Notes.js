const { U52Note } = require('../../models');

const {
  formatDate,
  validateInput,
  checkAuthorization,
  handleError,
  findNotesByDate,
  addNote,
} = require('../../utils');

exports.getNotesByDate = async (req, res, next) => {
  const { day } = req.params;
  const { userData } = req;

  if (!validateInput(req.params, ['day'], next)) return;

  const formattedDate = formatDate(day);
  checkAuthorization(userData, 'u52', next);

  try {
    const notes = await findNotesByDate(U52Note, formattedDate);

    if (!notes || notes.length === 0) {
      return handleError(next, `there is no notes in Unit 52 on: ${day}.`, 404);
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
  checkAuthorization(userData, 'u52', next);

  try {
    await addNote(U52Note, { note, day: formattedDate, userId: userData.id });

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
  checkAuthorization(userData, 'u52', next);

  try {
    const createPromises = notes.map(
      async (note) =>
        await addNote(U52Note, {
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
