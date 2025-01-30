// services/levelService.js
const Level = require('../../models/Level'); // Importamos el modelo

// Obtener todos los niveles
const getAllLevels = async () => {
  try {
    const levels = await Level.findAll();
    return levels;
  } catch (error) {
    throw new Error('Error fetching levels: ' + error.message);
  }
};

// Obtener un nivel por su ID
const getLevelById = async (levelId) => {
  try {
    const level = await Level.findByPk(levelId);
    if (!level) {
      throw new Error('Level not found');
    }
    return level;
  } catch (error) {
    throw new Error('Error fetching level by ID: ' + error.message);
  }
};

// Crear un nuevo nivel
const createLevel = async (name) => {
  try {
    const newLevel = await Level.create({ name });
    return newLevel;
  } catch (error) {
    throw new Error('Error creating level: ' + error.message);
  }
};

// Actualizar un nivel
const updateLevel = async (levelId, name) => {
  try {
    const level = await Level.findByPk(levelId);
    if (!level) {
      throw new Error('Level not found');
    }
    level.name = name;
    await level.save();
    return level;
  } catch (error) {
    throw new Error('Error updating level: ' + error.message);
  }
};

// Eliminar un nivel
const deleteLevel = async (levelId) => {
  try {
    const level = await Level.findByPk(levelId);
    if (!level) {
      throw new Error('Level not found');
    }
    await level.destroy();
    return { message: 'Level deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting level: ' + error.message);
  }
};

module.exports = {
  getAllLevels,
  getLevelById,
  createLevel,
  updateLevel,
  deleteLevel,
};
