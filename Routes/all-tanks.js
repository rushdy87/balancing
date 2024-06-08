const express = require('express');

const AllTanksControllers = require('../controllers/all-tanks');

const router = express.Router();

router.get('/tanks/:day', AllTanksControllers.getAllTanksByDay);

router.get('/tank/:tag_number/:day', AllTanksControllers.getTankByDay);

router.get('/tanks/:from/:to', AllTanksControllers.getAllTankBetweenTwoDates);

router.get('/report/:day', AllTanksControllers.getTanksReportByDay);

module.exports = router;
