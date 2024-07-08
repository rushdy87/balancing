const { Router } = require('express');

const U53NoteControllers = require('../../controllers/u53/u53Notes');

const router = Router();
// /api/u53/notes/....

// get notes by date
router.get('/:day', U53NoteControllers.getNotesByDate);
// response ==> [{id, day, note}, ...]

// add note
router.post('/', U53NoteControllers.addOneNote);
// request body ===> {day, note}

// add notes
router.post('/all', U53NoteControllers.addNotesByDay);
// request body ===> {day, notes:[]}

// edit note
router.patch('/:id', U53NoteControllers.updateNote);
// request body ===> note

// delete note
router.delete('/:id', U53NoteControllers.deleteNote);

module.exports = router;
