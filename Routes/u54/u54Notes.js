const { Router } = require('express');

const U54NoteControllers = require('../../controllers/u54/u54Notes');

const router = Router();
// /api/u53/notes/....

// get notes by date
router.get('/:day', U54NoteControllers.getNotesByDate);
// response ==> [{id, day, note}, ...]

// add note
router.post('/', U54NoteControllers.addOneNote);
// request body ===> {day, note}

// add notes
router.post('/all', U54NoteControllers.addNotesByDay);
// request body ===> {day, notes:[]}

// edit note
router.patch('/:id', U54NoteControllers.updateNote);
// request body ===> note

// delete note
router.delete('/:id', U54NoteControllers.deleteNote);

module.exports = router;
