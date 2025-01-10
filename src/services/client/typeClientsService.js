const TypeClient = require('../../models/TypeClient');

const getAllTypeClients = async () => {
  return await TypeClient.findAll();
};

const getTypeClientById = async (id) => {
  return await TypeClient.findByPk(id);
};

const createTypeClient = async (data) => {
  return await TypeClient.create(data);
};

const updateTypeClient = async (id, data) => {
  const typeClient = await TypeClient.findByPk(id);
  if (!typeClient) {
    throw new Error('TypeClient not found');
  }
  return await typeClient.update(data);
};

const deleteTypeClient = async (id) => {
  const typeClient = await TypeClient.findByPk(id);
  if (!typeClient) {
    throw new Error('TypeClient not found');
  }
  await typeClient.destroy();
  return typeClient;
};

module.exports = {
  getAllTypeClients,
  getTypeClientById,
  createTypeClient,
  updateTypeClient,
  deleteTypeClient,
};
