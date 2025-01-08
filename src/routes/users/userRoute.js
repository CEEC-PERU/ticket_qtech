const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userController');


router.post('/bulk', userController.createUsersController);
router.post('/new', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);



module.exports = router;
