const { Router } = require('express');
const { getAllData } = require('../../controllers/unit90/admin');

const { addNotes } = require('../../controllers/unit90/notes');

const router = Router();
// /api/u590/admin/....

router.get('/all/:day', getAllData);

router.post('/notes', addNotes);

module.exports = router;
