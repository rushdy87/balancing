const { Router } = require('express');

const U90NoteControllers = require('../../controllers/u90/u90Notes');

const router = Router();
// /api/u53/notes/....

// get notes by date
router.get('/:day', U90NoteControllers.getNotesByDate);
// response ==> [{id, day, note}, ...]

// add note
router.post('/', U90NoteControllers.addOneNote);
// request body ===> {day, note}

// add notes
router.post('/all', U90NoteControllers.addNotesByDay);
// request body ===> {day, notes:[]}

// edit note
router.patch('/:id', U90NoteControllers.updateNote);
// request body ===> note

// delete note
router.delete('/:id', U90NoteControllers.deleteNote);

module.exports = router;
