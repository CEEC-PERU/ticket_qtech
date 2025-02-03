const { updateDetailRequest } = require('../../services/ticket/detailRequestService');

// Controller for handling the request to update the DetailRequest and upload files
const updateDetailRequestController = async (req, res) => {
  try {
    const { requestId } = req.params;  // Extract requestId from the route parameter
    const { newDetail } = req.body;   // Get the new detail from the body of the request
    const files = req.files;          // Get the uploaded files

    // Call the service to update the DetailRequest and upload the files
    const result = await updateDetailRequest(requestId, newDetail, files);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in controller:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { updateDetailRequestController };
