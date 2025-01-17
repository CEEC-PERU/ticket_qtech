const express = require('express');
const adminManagementController = require('../../controllers/management/adminManagementController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const router = express.Router();


router.get('/', adminManagementController.getAll);
router.get('/:id', adminManagementController.getById);
router.post('/', adminManagementController.create);
router.put('/:id', adminManagementController.update);
router.delete('/:id',  adminManagementController.remove);

// Filtros
router.get('/filter/user/:user_id', adminManagementController.filterByUserId);
router.get('/filter/management/:management_id', adminManagementController.filterByManagementId);

module.exports = router;
