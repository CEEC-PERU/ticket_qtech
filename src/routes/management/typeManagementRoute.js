const express = require('express');
const typeManagementController = require('../../controllers/management/typeManagementController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const router = express.Router();

router.get('/',authenticateToken, typeManagementController.getAllTypeManagements);
router.get('/:id',authenticateToken, typeManagementController.getTypeManagementById);
router.post('/',authenticateToken, typeManagementController.createTypeManagement);
router.put('/:id', authenticateToken,typeManagementController.updateTypeManagement);
router.delete('/:id',authenticateToken, typeManagementController.deleteTypeManagement);

module.exports = router;
