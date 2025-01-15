const { createRequest } = require('../../services/ticket/requestService');

const submitRequest = async (req, res) => {
  try {
    const requestData = req.body; // Datos enviados en el cuerpo
    const attachedFiles = req.files.materials; // Archivos subidos

    const result = await createRequest(requestData, attachedFiles);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error en submitRequest:', error);
    res.status(500).json({ error: error.message || 'Error al crear la solicitud' });
  }
};

module.exports = { submitRequest };
