const { createRequest , updateStateRequestService2, updateRequestservice, updateStateRequestService, getRequestsByUserId } = require('../../services/ticket/requestService');

const AdminTicket = require('../../models/AdminTicket.js');
const Request = require('../../models/Request.js');
const TimeTicket = require('../../models/TimeTicket.js');
const { get } = require('http');

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



//PENDIENTE
const updateRequest = async (req, res) => {
  const { request_id , user_id} = req.params;
  const { is_aproved, attention_time , time_pendiente} = req.body;

  try {
    // Primero, actualizamos la solicitud
    const updatedRequest = await updateRequestservice(request_id, {
      is_aproved,
      attention_time,
      state_id: 3,
    });
    

    // Ahora, creamos un AdminTicket asociado
    const newAdminTicket = await AdminTicket.create({
      user_id,
      request_id,
    });
    
    
    const newTimeTicket = await TimeTicket.create({
      adminticket_id : newAdminTicket.adminticket_id,
      time_pendiente : time_pendiente,
    });

    return res.status(200).json({
      message: 'Solicitud actualizada con éxito y AdminTicket creado.',
      data: updatedRequest,
      adminTicket: newAdminTicket, // Devolver el AdminTicket creado
      newTimeTicket : newTimeTicket
    });




  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//En el modelo de Request existe un user_id , obtener el email y tambien include el profile con su name y lastname , a ese usuario se enviara correo con el tiempo estimado y 
// mencionando que el estado se encuentra en pendiente  y que diga responsable al  user_id que viene del req.params realizar el filtrado para obtener datos del usuario admin, de igualmanera su email 
// y name y lastname .



//PROCESO 
const updateRequestState = async (req, res) => {
  const { request_id } = req.params;
  const { state_id } = req.body;

  if (!state_id) {
    return res.status(400).json({ message: 'El campo state_id es requerido' });
  }

 try {
    // Paso 1: Obtener el AdminTicket que corresponde al request_id
    const adminTicket = await AdminTicket.findOne({
      where: { request_id }, // Filtramos por request_id
    });

    if (!adminTicket) {
      return res.status(404).json({ message: 'AdminTicket no encontrado para la solicitud.' });
    }

    // Paso 2: Obtener el adminticket_id
    const { adminticket_id } = adminTicket;

    // Paso 3: Buscar el TimeTicket asociado a este adminticket_id
    const timeTicket = await TimeTicket.findOne({
      where: { adminticket_id }, // Filtramos por adminticket_id
    });

    if (!timeTicket) {
      return res.status(404).json({ message: 'TimeTicket no encontrado para el AdminTicket.' });
    }

    // Paso 4: Actualizar el time_finalizado en TimeTicket
    const currentDate = new Date(); // Fecha actual

    await timeTicket.update({
      time_proceso: currentDate, // Asignamos la fecha actual
    });

    // Paso 5: Actualizar el estado de la solicitud
    const updatedRequest = await updateStateRequestService(request_id, state_id);
    // Responder con éxito
    res.status(200).json({
      message: 'Estado de la solicitud y TimeTicket actualizados correctamente.',
      request_id,
      time_finalizado: currentDate, // Incluimos la fecha finalizada
    });
  }  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//FINALIZADO
const updateRequestStateFinalizado = async (req, res) => {
  const { request_id } = req.params;
  const { state_id } = req.body;

  if (!state_id) {
    return res.status(400).json({ message: 'El campo state_id es requerido' });
  }

  try {
    // Paso 1: Obtener el AdminTicket que corresponde al request_id
    const adminTicket = await AdminTicket.findOne({
      where: { request_id }, // Filtramos por request_id
    });

    if (!adminTicket) {
      return res.status(404).json({ message: 'AdminTicket no encontrado para la solicitud.' });
    }

    // Paso 2: Obtener el adminticket_id
    const { adminticket_id } = adminTicket;

    // Paso 3: Buscar el TimeTicket asociado a este adminticket_id
    const timeTicket = await TimeTicket.findOne({
      where: { adminticket_id }, // Filtramos por adminticket_id
    });

    if (!timeTicket) {
      return res.status(404).json({ message: 'TimeTicket no encontrado para el AdminTicket.' });
    }

    // Paso 4: Actualizar el time_finalizado en TimeTicket
    const currentDate = new Date(); // Fecha actual

    await timeTicket.update({
      time_finalizado: currentDate, // Asignamos la fecha actual
    });

    // Paso 5: Actualizar el estado de la solicitud
    const updatedRequest = await updateStateRequestService2(request_id, state_id);
    // Responder con éxito
    res.status(200).json({
      message: 'Estado de la solicitud y TimeTicket actualizados correctamente.',
      request_id,
      time_finalizado: currentDate, // Incluimos la fecha finalizada
    });
  } catch (error) {
    console.error('Error al actualizar la solicitud:', error);
    res.status(500).json({ message: error.message });
  }
};





const getRequestsByUser = async (req, res) => {
  const { user_id } = req.params; // Obtenemos el `user_id` de los parámetros de la URL
  console.log('req.params:', req.params); // Agregar esto para depuración

  try {
    const requests = await getRequestsByUserId(user_id);
    
    if (!requests.length) {
      return res.status(404).json({ message: 'No se encontraron solicitudes para este usuario' });
    }

    res.json(requests);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




module.exports = { updateRequestStateFinalizado, submitRequest , updateRequest , updateRequestState , getRequestsByUser};
