const express = require('express');
const { getReportByDay } = require('../../controllers/reports');

const router = express.Router();

router.get('/:day', getReportByDay);

module.exports = router;
