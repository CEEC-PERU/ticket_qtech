const typeManagementService = require('../../services/management/typeManagementService');

const getAllTypeManagements = async (req, res) => {
  try {
    const typeManagements = await typeManagementService.getAllTypeManagements();
    res.status(200).json(typeManagements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTypeManagementById = async (req, res) => {
  try {
    const { id } = req.params;
    const typeManagement = await typeManagementService.getTypeManagementById(id);
    if (!typeManagement) {
      return res.status(404).json({ message: 'TypeManagement not found' });
    }
    res.status(200).json(typeManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTypeManagement = async (req, res) => {
  try {
    const data = req.body;
    const newTypeManagement = await typeManagementService.createTypeManagement(data);
    res.status(201).json(newTypeManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTypeManagement = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedTypeManagement = await typeManagementService.updateTypeManagement(id, data);
    res.status(200).json(updatedTypeManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTypeManagement = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTypeManagement = await typeManagementService.deleteTypeManagement(id);
    res.status(200).json(deletedTypeManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTypeManagements,
  getTypeManagementById,
  createTypeManagement,
  updateTypeManagement,
  deleteTypeManagement,
};
