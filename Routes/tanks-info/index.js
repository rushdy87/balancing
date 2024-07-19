const express = require('express');
const {
  getTankInfo,
  getTanksInfo,
  updateTanksInfo,
  changeTankActivation,
  getTanksInfoByUnit,
} = require('../../controllers/tanks-info');

const router = express.Router();

router.get('/', getTanksInfo);

router.get('/:unit', getTanksInfoByUnit);

router.get('/tank/:tag_number', getTankInfo);

router.patch('/', updateTanksInfo);

router.patch('/activation', changeTankActivation); // {tag_number}

module.exports = router;
