const DetailManagement = require('../../models/DetailManagement');

const getAllDetailManagements = async () => {
  return await DetailManagement.findAll();
};

const getDetailManagementById = async (id) => {
  return await DetailManagement.findByPk(id);
};

const getDetailManagementsByManagementId = async (management_id) => {
  return await DetailManagement.findAll({ where: { management_id } });
};

const createDetailManagement = async (data) => {
  return await DetailManagement.create(data);
};

const updateDetailManagement = async (id, data) => {
  const detailManagement = await DetailManagement.findByPk(id);
  if (!detailManagement) {
    throw new Error('DetailManagement not found');
  }
  return await detailManagement.update(data);
};

const deleteDetailManagement = async (id) => {
  const detailManagement = await DetailManagement.findByPk(id);
  if (!detailManagement) {
    throw new Error('DetailManagement not found');
  }
  await detailManagement.destroy();
  return detailManagement;
};

module.exports = {
  getAllDetailManagements,
  getDetailManagementById,
  getDetailManagementsByManagementId,
  createDetailManagement,
  updateDetailManagement,
  deleteDetailManagement,
};
