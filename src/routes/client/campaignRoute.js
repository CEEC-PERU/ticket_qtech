const express = require('express');
const campaignController = require('../../controllers/client/campaignController');

const authenticateToken = require('../../middlewares/authenticationMiddleware');
const router = express.Router();

router.get('/',authenticateToken, campaignController.getAllCampaigns);
router.get('/:id',authenticateToken, campaignController.getCampaignById);
router.get('/client/:client_id', authenticateToken,campaignController.getCampaignsByClientId);
router.post('/', authenticateToken,campaignController.createCampaign);
router.put('/:id',authenticateToken, campaignController.updateCampaign);
router.delete('/:id', authenticateToken,campaignController.deleteCampaign);

module.exports = router;
