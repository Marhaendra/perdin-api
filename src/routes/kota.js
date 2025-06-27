const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const KotaController = require('../controller/kota');
const { cityValidationRules } = require('../validators/kotaValidator');

// Public 
router.get('/', KotaController.getAllCities);
router.get('/:id', KotaController.getCityDetail);

// Admin-only 
router.post('/', 
  authenticateToken,
  authorizeRoles('DIVISI-SDM'),
  cityValidationRules(),
  KotaController.createCity
);

router.put('/:id', 
  authenticateToken,
  authorizeRoles('DIVISI-SDM'),
  cityValidationRules(),
  KotaController.updateCity
);

router.delete('/:id', 
  authenticateToken,
  authorizeRoles('DIVISI-SDM'),
  KotaController.deleteCity
);

module.exports = router;