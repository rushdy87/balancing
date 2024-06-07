const express = require('express');

const TanksInfoControllers = require('../controllers/tanks-info');

const router = express.Router();

// /api/tanks-info/....

router.get('/:tag_number', TanksInfoControllers.getTankInfo);

router.get('/', TanksInfoControllers.getAllTanksInfo);

router.patch('/:tag_number', TanksInfoControllers.updateTankInfo);

router.patch('/', TanksInfoControllers.updateAllTanksInfo);

module.exports = router;

/**
 * Key Differences between PUT and PATCH:
 * - PUT updates the entire resource.
 * - PATCH updates part of the resource.
 * - PUT is idempotent, meaning multiple identical requests will have the same effect.
 * - PATCH is not necessarily idempotent; its effect can depend on the current state of the resource.
 * - PUT requires the complete resource data to be sent.
 * - PATCH only requires the data that needs to be modified.
 * - PUT can CREATE the resource if it does not exist, updates the resource if it already exists.
 * - PATCH requires the resource to exist, returns an error (e.g., 404 Not Found) if the resource does not exist.
 */
