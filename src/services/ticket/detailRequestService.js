const DetailRequest = require('../../models/DetailRequest');
const FileDetail = require('../../models/FileDetail');
const Rejection = require('../../models/Rejection.js');
const fileService = require('../archivos/fileServiceS3.js');
const { Op } = require('sequelize'); // for advanced querying if needed
const { v4: uuidv4 } = require('uuid'); // Para generar nombres únicos
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

   
    // Step 4: Handle file uploads if files exist
    if (!files || files.length === 0) {
      throw new Error('No files found.');
    }

    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const fileExtension = file.originalname.split('.').pop(); // Extract the file extension
        const fileName = `${uuidv4()}.${fileExtension}`; // Generate a unique file name
        const fileUrl = await fileService.uploadToS3(file.buffer, 'evidencia', fileName, file.mimetype);

        return {
          file: fileUrl,
          id_det_request: detailRequest.id_det_request, // Link the file with the updated detail request
        };
      })
    );
     // Obtain the request_id from the updated DetailRequest
     const updatedRequestId = detailRequest.request_id;

     // Step 3: Delete the associated Rejection (if any)
     await Rejection.destroy({
       where: { request_id: updatedRequestId },
     });
 

    // Step 5: Insert the file details into the database
    await FileDetail.bulkCreate(fileDetails);

    return { success: true, message: 'Detail request updated successfully and associated rejection removed.' };
  } catch (error) {
    console.error('Error updating detail request:', error);
    throw error;
  }
};

module.exports = { updateDetailRequest };


