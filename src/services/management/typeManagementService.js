const TypeManagement = require('../../models/TypeManagement');

const getAllTypeManagements = async () => {
  return await TypeManagement.findAll();
};

const getTypeManagementById = async (id) => {
  return await TypeManagement.findByPk(id);
};

const createTypeManagement = async (data) => {
  return await TypeManagement.create(data);
};

const updateTypeManagement = async (id, data) => {
  const typeManagement = await TypeManagement.findByPk(id);
  if (!typeManagement) {
    throw new Error('TypeManagement not found');
  }
  return await typeManagement.update(data);
};

const deleteTypeManagement = async (id) => {
  const typeManagement = await TypeManagement.findByPk(id);
  if (!typeManagement) {
    throw new Error('TypeManagement not found');
  }
  await typeManagement.destroy();
  return typeManagement;
};

module.exports = {
  getAllTypeManagements,
  getTypeManagementById,
  createTypeManagement,
  updateTypeManagement,
  deleteTypeManagement,
};
