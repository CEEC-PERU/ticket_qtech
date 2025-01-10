const detailManagementService = require('../../services/management/detailManagementService');

const getAllDetailManagements = async (req, res) => {
  try {
    const detailManagements = await detailManagementService.getAllDetailManagements();
    res.status(200).json(detailManagements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDetailManagementById = async (req, res) => {
  try {
    const { id } = req.params;
    const detailManagement = await detailManagementService.getDetailManagementById(id);
    if (!detailManagement) {
      return res.status(404).json({ message: 'DetailManagement not found' });
    }
    res.status(200).json(detailManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDetailManagementsByManagementId = async (req, res) => {
  try {
    const { management_id } = req.params;
    const detailManagements = await detailManagementService.getDetailManagementsByManagementId(management_id);
    res.status(200).json(detailManagements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDetailManagement = async (req, res) => {
  try {
    const data = req.body;
    const newDetailManagement = await detailManagementService.createDetailManagement(data);
    res.status(201).json(newDetailManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDetailManagement = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedDetailManagement = await detailManagementService.updateDetailManagement(id, data);
    res.status(200).json(updatedDetailManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDetailManagement = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDetailManagement = await detailManagementService.deleteDetailManagement(id);
    res.status(200).json(deletedDetailManagement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDetailManagements,
  getDetailManagementById,
  getDetailManagementsByManagementId,
  createDetailManagement,
  updateDetailManagement,
  deleteDetailManagement,
};
