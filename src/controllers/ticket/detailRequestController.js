const { updateDetailRequest } = require('../../services/ticket/detailRequestService');


// Controller for handling the request to update the DetailRequest and upload files


const updateDetailRequestController = async (req, res) => {
  try {
    const { requestId } = req.params;  // Extraer requestId del parámetro de la ruta
    const { newDetail } = req.body;   // Obtener el nuevo detalle del cuerpo de la solicitud
    const files = req.files?.materials;  // Obtener los archivos del campo 'materials'

    if (!files || files.length === 0) {
      throw new Error('No files found.');
    }

    // Llamar al servicio para actualizar el detalle de la solicitud y cargar los archivos
    const result = await updateDetailRequest(requestId, newDetail, files);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in controller:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


module.exports = { updateDetailRequestController };
