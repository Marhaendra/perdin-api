const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const PerdinController = require('../controller/perdin');

//Public
router.post('/', authenticateToken, authorizeRoles('PEGAWAI'), PerdinController.createPerdin);
router.get('/:userId', authenticateToken, authorizeRoles('PEGAWAI'), PerdinController.getUserPerdin);

//Admin
router.get('/', authenticateToken, authorizeRoles('DIVISI-SDM'), PerdinController.getAllPerdin);
router.put('/:id/approve', authenticateToken, authorizeRoles('DIVISI-SDM'), PerdinController.approvePerdin);
router.put('/:id/reject', authenticateToken, authorizeRoles('DIVISI-SDM'), PerdinController.rejectPerdin);

module.exports = router;