const { Router } = require('express');
const { getAllData } = require('../../controllers/unit54/admin');
const { addNotes } = require('../../controllers/unit54/notes');

const router = Router();
// /api/u53/admin/....

router.get('/all/:day', getAllData);
router.post('/notes', addNotes);

module.exports = router;
