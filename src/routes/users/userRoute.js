const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');
// Ruta para obtener un usuario con su perfil por user_id
router.get('/user/:userId',authenticateToken, userController.getUser);

router.post('/bulk',authenticateToken, userController.createUsersController);
router.post('/userprofile',authenticateToken, userController.registerUser);
router.post('/new',authenticateToken, userController.createUser);
router.put('/users/:id',authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken,userController.deleteUser);


module.exports = router;

