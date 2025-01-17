const adminManagementService = require('../../services/management/adminManagementService');

const getAll = async (req, res) => {
  try {
    const adminManagements = await adminManagementService.getAll();
    res.json(adminManagements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const adminManagement = await adminManagementService.getById(id);
    if (!adminManagement) return res.status(404).json({ error: 'Not found' });
    res.json(adminManagement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;
    const newAdminManagement = await adminManagementService.create(data);
    res.status(201).json(newAdminManagement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedAdminManagement = await adminManagementService.update(id, data);
    res.json(updatedAdminManagement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await adminManagementService.remove(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filterByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const results = await adminManagementService.filterByUserId(user_id);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filterByManagementId = async (req, res) => {
  try {
    const { management_id } = req.params;
    const results = await adminManagementService.filterByManagementId(management_id);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  filterByUserId,
  filterByManagementId,
};