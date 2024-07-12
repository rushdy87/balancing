const express = require('express');

const {
  getTanksByDay,
  getTanksBetweenTwoDates,
} = require('../../controllers/unit53/tanks');

const router = express.Router();

// /api/u53/tanks/....

router.get('/:day', getTanksByDay);

router.get('/:from/:to', getTanksBetweenTwoDates);

//{day: "01-01-2024, tanks: {[tag_number]: [TOV]}"}
router.post('/');

// {tag_number:"", tov:$num,day: "01-01-2024}
router.post('/tank');

// {tov: $$$}
router.patch('/tank/:tag_number/:day');

router.patch('/confirmation');

module.exports = router;
