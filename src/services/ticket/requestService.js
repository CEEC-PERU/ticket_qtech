const Request = require('../../models/Request');
const DetailRequest = require('../../models/DetailRequest');
const FileDetail = require('../../models/FileDetail');
const AdminTicket = require('../../models/AdminTicket.js');
const Campaign = require('../../models/Campaign');
const DetailManagement = require('../../models/DetailManagement');
const Profile = require('../../models/Profile');
const State = require('../../models/State');
const TypeClient = require('../../models/TypeClient');
const TypeManagement = require('../../models/TypeManagement');
const TimeTicket = require('../../models/TimeTicket.js');
const User = require('../../models/User');
const Level = require('../../models/Level.js');
const fileService = require('../archivos/fileServiceS3.js');
const { v4: uuidv4 } = require('uuid'); // Para generar nombres únicos
const Rejection = require('../../models/Rejection.js');

const createRequest = async (data, files) => {
  const {
    levelId,
    title,
    campaignId,
    managementId,
    clientId,
    detailManagementId,
    requestDetails,
    user_id,
  } = data;
  const numericLevelId = parseInt(levelId, 10);
  const numericCampaignId = parseInt(campaignId, 10);
  const numericManagementId = parseInt(managementId, 10);
  const numericClientId = parseInt(clientId, 10);
  const numericDetailManagementId = parseInt(detailManagementId, 10);
  const numericUserId = parseInt(user_id, 10);

  try {
    const newRequest = await Request.create({
      title: title,
      campaign_id: numericCampaignId,
      management_id: numericManagementId,
      client_id: numericClientId,
      det_management_id: numericDetailManagementId,
      active: true,
      state_id: 5, // Default state
      level_id: numericLevelId,
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
        const fileExtension = file.originalname.split('.').pop(); // Extraer la extensión del archivo
        const fileName = `${uuidv4()}.${fileExtension}`; // Nombre único con UUID
        const fileUrl = await fileService.uploadToS3(
          file.buffer,
          'evidencia',
          fileName,
          file.mimetype
        );
        return {
          file: fileUrl,
          id_det_request: newDetailRequest.id_det_request,
        };
      })
    );

    await FileDetail.bulkCreate(fileDetails);
    console.log(newRequest.number_ticket);
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

const updateRequestservice = async (request_id, updateData) => {
  try {
    const request = await Request.findByPk(request_id);
    if (!request) {
      throw new Error('Solicitud no encontrada');
    }

    await request.update(updateData);
    return request;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStateRequestService = async (request_id, state_id) => {
  try {
    const request = await Request.findByPk(request_id);
    if (!request) {
      throw new Error('Solicitud no encontrada');
    }

    await request.update({ state_id });
    return request;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStateRequestService2 = async (request_id, state_id) => {
  try {
    const request = await Request.findByPk(request_id);
    if (!request) {
      throw new Error('Solicitud no encontrada');
    }

    await request.update({ state_id });
    return request;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRequestsByUserId = async (user_id) => {
  try {
    const requests = await Request.findAll({
      where: { user_id },
      include: [
        {
          model: User,
          attributes: ['email'],
          as: 'user',
          include: [
            {
              model: Profile,
              attributes: ['name', 'lastname'],
              as: 'profile',
            },
          ],
        },
        {
          model: State,
          attributes: ['name'],
          as: 'state',
        },
        {
          model: Level,
          attributes: ['name'],
        },
        {
          model: TypeClient,
          attributes: ['name'],
        },
        {
          model: Campaign,
          attributes: ['name'],
          as: 'campaign',
        },
        {
          model: TypeManagement,
          attributes: ['name'],
        },
        {
          model: DetailManagement,
          attributes: ['name'],
          as: 'detailManagement',
        },
        {
          model: DetailRequest,
          attributes: ['detail_name'],
          include: [
            {
              model: FileDetail,
              attributes: ['file'],
              as: 'fileDetails',
            },
          ],
        },
        {
          model: AdminTicket,
          attributes: ['user_id'],
          as: 'adminTickets',
          include: [
            {
              model: User,
              attributes: ['email'],
              as: 'adminUser',
              include: [
                {
                  model: Profile,
                  attributes: ['name', 'lastname'],
                  as: 'profile',
                },
              ],
            },
            {
              model: TimeTicket,
              attributes: ['time_pendiente', 'time_proceso', 'time_finalizado'],
              as: 'timeTickets',
            },
          ],
        },
        {
          model: Rejection,
          attributes: ['reason'],
        },
      ],
      order: [['created_at', 'DESC']], // Ordena por fecha de creación descendente
    });

    return requests;
  } catch (error) {
    console.error('Error al obtener las solicitudes por usuario:', error);
    throw new Error('Error al obtener las solicitudes');
  }
};

module.exports = {
  updateStateRequestService2,
  createRequest,
  updateRequestservice,
  updateStateRequestService,
  getRequestsByUserId,
};
