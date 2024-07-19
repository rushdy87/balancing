const express = require('express');
const {
  getTankInfo,
  getTanksInfo,
  updateTanksInfo,
} = require('../../controllers/tanks-info');

const router = express.Router();

router.get('/:tag_number', getTankInfo);
router.get('/', getTanksInfo);

router.patch('/', updateTanksInfo);

module.exports = router;
