const express = require('express');

const {
  getTanksByDay,
  getTanksBetweenTwoDates,
} = require('../../controllers/unit52/tanks');

const router = express.Router();

// /api/u52/tanks/....

router.get('/:day', getTanksByDay);

router.get('/:from/:to', getTanksBetweenTwoDates);

//{day: "01-01-2024, tanks: {[tag_number]: [TOV]}"}
router.post('/');

// {tov: $$$}
router.patch('/tank/:tag_number/:day');

router.patch('/confirmation');

module.exports = router;
