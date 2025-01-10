const typeClientService = require('../../services/client/typeClientsService');

const getAllTypeClients = async (req, res) => {
  try {
    const typeClients = await typeClientService.getAllTypeClients();
    res.status(200).json(typeClients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTypeClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const typeClient = await typeClientService.getTypeClientById(id);
    if (!typeClient) {
      return res.status(404).json({ message: 'TypeClient not found' });
    }
    res.status(200).json(typeClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTypeClient = async (req, res) => {
  try {
    const data = req.body;
    const newTypeClient = await typeClientService.createTypeClient(data);
    res.status(201).json(newTypeClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTypeClient = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedTypeClient = await typeClientService.updateTypeClient(id, data);
    res.status(200).json(updatedTypeClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTypeClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTypeClient = await typeClientService.deleteTypeClient(id);
    res.status(200).json(deletedTypeClient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTypeClients,
  getTypeClientById,
  createTypeClient,
  updateTypeClient,
  deleteTypeClient,
};
