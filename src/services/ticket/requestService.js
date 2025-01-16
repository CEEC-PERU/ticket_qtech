const Request = require('../../models/Request');
const DetailRequest = require('../../models/DetailRequest');
const FileDetail = require('../../models/FileDetail');
const fileService = require('../archivos/fileServiceS3.js');

const createRequest = async (data, files) => {
  const { 
    title, 
    campaignId, 
    managementId, 
    clientId, 
    detailManagementId, 
    requestDetails ,
    user_id
  } = data;
  
  const numericCampaignId = parseInt(campaignId, 10);
  const numericManagementId = parseInt(managementId, 10);
  const numericClientId = parseInt(clientId, 10);
  const numericDetailManagementId = parseInt(detailManagementId, 10);
  const numericUserId = parseInt(user_id, 10);

  try {
    const newRequest = await Request.create({
      title : title,
      campaign_id: numericCampaignId,
      management_id: numericManagementId,
      client_id: numericClientId,
      det_management_id: numericDetailManagementId,
      active: true,
      state_id: 1, // Default state
      number_ticket: Math.floor(Math.random() * 1000000), // Random ticket number
      user_id: numericUserId, // Replace with real user_id
    });

    const newDetailRequest = await DetailRequest.create({
      detail_name: requestDetails,
      request_id: newRequest.request_id,
    });

    if (!files || files.length === 0) {
      throw new Error('No files found.');
    }

    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        const fileUrl = await fileService.uploadToS3(file.buffer, 'evidencia', fileName, file.mimetype);
        return {
          file: fileUrl,
          id_det_request: newDetailRequest.id_det_request,
        };
      })
    );

    await FileDetail.bulkCreate(fileDetails);
console.log(newRequest.number_ticket)
    // Return response with ticket number and the request details
    return {
      message: 'Request created successfully',
      newRequest,
      newDetailRequest,
      number_ticket: newRequest.number_ticket, // Send ticket number
      request_id: newRequest.request_id, // Send request id
    };
  } catch (error) {
    console.error('Error in createRequest:', error);
    throw new Error('Error creating request');
  }
};


module.exports = { createRequest };
