// routes/levelRoutes.js
const express = require('express');
const router = express.Router();
const levelController = require('../../controllers/states/levelController');
const authenticateToken = require('../../middlewares/authenticationMiddleware');
// Obtener todos los niveles
router.get('/levels',authenticateToken, levelController.getAllLevels);

// Obtener un nivel por ID
router.get('/levels/:levelId',authenticateToken, levelController.getLevelById);

// Crear un nuevo nivel
router.post('/levels',authenticateToken, levelController.createLevel);

// Actualizar un nivel existente
router.put('/levels/:levelId',authenticateToken, levelController.updateLevel);

// Eliminar un nivel
router.delete('/levels/:levelId', authenticateToken,levelController.deleteLevel);

module.exports = router;
