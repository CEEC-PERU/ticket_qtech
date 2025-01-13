const Campaign = require('../../models/Campaign');
const TypeClient = require('../../models/TypeClient');

const getAllCampaigns = async () => {
  return await Campaign.findAll({
    include: [{ model: TypeClient, attributes: ['name'] , as: 'client' }], // Relación con TypeClient
  });
};

const getCampaignById = async (id) => {
  return await Campaign.findByPk(id, {
    include: [{ model: TypeClient, attributes: ['name'] , as: 'client' }],
  });
};

const getCampaignsByClientId = async (client_id) => {
  return await Campaign.findAll({
    where: { client_id },
    include: [{ model: TypeClient, attributes: ['name'] , as: 'client' }],
  });
};

const createCampaign = async (data) => {
  return await Campaign.create(data);
};

const updateCampaign = async (id, data) => {
  const campaign = await Campaign.findByPk(id);
  if (!campaign) {
    throw new Error('Campaign not found');
  }
  return await campaign.update(data);
};

const deleteCampaign = async (id) => {
  const campaign = await Campaign.findByPk(id);
  if (!campaign) {
    throw new Error('Campaign not found');
  }
  await campaign.destroy();
  return campaign;
};

module.exports = {
  getAllCampaigns,
  getCampaignById,
  getCampaignsByClientId,
  createCampaign,
  updateCampaign,
  deleteCampaign,
};
