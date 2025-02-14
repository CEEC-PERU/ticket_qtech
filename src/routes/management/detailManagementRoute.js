const express = require('express');
const detailManagementController = require('../../controllers/management/detailManagementController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const router = express.Router();

router.get('/',authenticateToken, detailManagementController.getAllDetailManagements);
router.get('/:id', authenticateToken,detailManagementController.getDetailManagementById);
router.get('/management/:management_id',authenticateToken, detailManagementController.getDetailManagementsByManagementId);
router.post('/',authenticateToken, detailManagementController.createDetailManagement);
router.put('/:id',authenticateToken, detailManagementController.updateDetailManagement);
router.delete('/:id',authenticateToken, detailManagementController.deleteDetailManagement);

module.exports = router;



