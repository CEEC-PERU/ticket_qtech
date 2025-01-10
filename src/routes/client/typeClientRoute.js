const express = require('express');
const typeClientController = require('../../controllers/client/typeClientController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');
const router = express.Router();

router.get('/',authenticateToken, typeClientController.getAllTypeClients);
router.get('/:id',authenticateToken, typeClientController.getTypeClientById);
router.post('/', authenticateToken,typeClientController.createTypeClient);
router.put('/:id',authenticateToken, typeClientController.updateTypeClient);
router.delete('/:id',authenticateToken, typeClientController.deleteTypeClient);

module.exports = router;
