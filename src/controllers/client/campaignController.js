const campaignService = require('../../services/client/campaignService');

const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await campaignService.getAllCampaigns();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await campaignService.getCampaignById(id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCampaignsByClientId = async (req, res) => {
  try {
    const { client_id } = req.params;
    const campaigns = await campaignService.getCampaignsByClientId(client_id);
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCampaign = async (req, res) => {
  try {
    const data = req.body;
    const newCampaign = await campaignService.createCampaign(data);
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedCampaign = await campaignService.updateCampaign(id, data);
    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCampaign = await campaignService.deleteCampaign(id);
    res.status(200).json(deletedCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCampaigns,
  getCampaignById,
  getCampaignsByClientId,
  createCampaign,
  updateCampaign,
  deleteCampaign,
};
