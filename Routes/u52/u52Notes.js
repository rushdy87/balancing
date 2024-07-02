const { Router } = require('express');

const U52NoteControllers = require('../../controllers/u52/u52Notes');

const router = Router();
// /api/u52/notes/....

// get notes by date
router.get('/:day', U52NoteControllers.getNotesByDate);
// response ==> [{id, day, note}, ...]

// add note
router.post('/');
// request body ===> {day, note}

// add notes
router.post('/all');
// request body ===> [{day, note}, ...]

// edit note
router.patch('/:id');
// request body ===> note

// delete note
router.delete('/:id');

module.exports = router;
