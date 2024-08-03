const { Router } = require('express');
const { getAllData } = require('../../controllers/unit53/admin');
const { addNotes } = require('../../controllers/unit53/notes');

const router = Router();
// /api/u53/admin/....

router.get('/all/:day', getAllData);
router.post('/notes', addNotes);

module.exports = router;
