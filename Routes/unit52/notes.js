const { Router } = require('express');
const {
  getNotesByDate,
  addOneNote,
  addNotes,
  updateNote,
  deleteNote,
} = require('../../controllers/unit52/notes');

const router = Router();
// /api/u52/notes/....

// get notes by date
router.get('/:day', getNotesByDate);
// response ==> [{id, day, note}, ...]

// add note
router.post('/', addOneNote);
// request body ===> {day, note}

// add notes
router.post('/all', addNotes);
// request body ===> {day, notes:[]}

// edit note
router.patch('/:id', updateNote);
// request body ===> note

// delete note
router.delete('/:id', deleteNote);

module.exports = router;
