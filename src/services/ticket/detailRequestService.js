const DetailRequest = require('../../models/DetailRequest');
const FileDetail = require('../../models/FileDetail');
const { Op } = require('sequelize'); // for advanced querying if needed

// Service to update the detail and upload new files for a specific request_id
const updateDetailRequest = async (requestId, newDetail, files) => {
  try {
    // Step 1: Find the DetailRequest by request_id
    const detailRequest = await DetailRequest.findOne({
      where: { request_id: requestId },
    });

    if (!detailRequest) {
      throw new Error('Detail request not found');
    }

    // Step 2: Update the detail_name
    await detailRequest.update({ detail_name: newDetail });

    // Step 3: Handle file uploads
    if (files && files.length > 0) {
      // Loop through the files and create records in FileDetail
      const fileDetails = files.map((file) => ({
        file: file.filename, // Assuming the file is stored with a filename
        id_det_request: detailRequest.id_det_request,
      }));

      await FileDetail.bulkCreate(fileDetails);
    }

    return { success: true, message: 'Detail request updated successfully' };
  } catch (error) {
    console.error('Error updating detail request:', error);
    throw error;
  }
};

module.exports = { updateDetailRequest };
