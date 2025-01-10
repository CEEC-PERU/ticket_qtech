const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');

router.post('/bulk',authenticateToken, userController.createUsersController);
router.post('/new',authenticateToken, userController.createUser);
router.put('/users/:id',authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken,userController.deleteUser);


module.exports = router;
