const { U52Note } = require('../../models');

const {
  formatDate,
  validateInput,
  checkAuthorization,
  handleError,
  findNotesByDate,
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
