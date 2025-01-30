// controllers/levelController.js
const levelService = require('../../services/states/levelService.js');

// Obtener todos los niveles
const getAllLevels = async (req, res) => {
  try {
    const levels = await levelService.getAllLevels();
    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un nivel por ID
const getLevelById = async (req, res) => {
  const { levelId } = req.params;
  try {
    const level = await levelService.getLevelById(levelId);
    res.status(200).json(level);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo nivel
const createLevel = async (req, res) => {
  const { name } = req.body;
  try {
    const newLevel = await levelService.createLevel(name);
    res.status(201).json(newLevel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un nivel
const updateLevel = async (req, res) => {
  const { levelId } = req.params;
  const { name } = req.body;
  try {
    const updatedLevel = await levelService.updateLevel(levelId, name);
    res.status(200).json(updatedLevel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un nivel
const deleteLevel = async (req, res) => {
  const { levelId } = req.params;
  try {
    const result = await levelService.deleteLevel(levelId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllLevels,
  getLevelById,
  createLevel,
  updateLevel,
  deleteLevel,
};
