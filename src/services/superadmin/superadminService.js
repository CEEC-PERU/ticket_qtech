const Request = require('../../models/Request.js');
const User = require('../../models/User.js');
const Profile = require('../../models/Profile.js');
const AdminTicket = require('../../models/AdminTicket.js');
const State = require('../../models/State.js');

const { Op } = require('sequelize');

const getAdminUsersWithTicketCounts = async () => {
  try {
    const adminUsers = await User.findAll({
      where: { role_id: 2 },
      attributes: ['user_id'],
      include: [
        {
          model: Profile,
          as: 'profile',
          attributes: ['name', 'lastname'],
        },
        {
          model: AdminTicket,
          as: 'adminTickets',
          include: {
            model: Request,
            as: 'request',
            include: {
              model: State,
              as: 'state',
              attributes: ['name'],
            },
          },
        },
      ],
    });

    // Procesar resultados
    return adminUsers.map((user) => {
      const ticketCounts = {
        pendientes: 0,
        en_proceso: 0,
        finalizados: 0,
      };

      // Usar alias correcto: user.adminTickets
      user.adminTickets?.forEach((ticket) => {
        const state = ticket.request?.state?.name;
        if (state === 'PENDIENTE') ticketCounts.pendientes++;
        else if (state === 'EN PROCESO') ticketCounts.en_proceso++;
        else if (state === 'FINALIZADO') ticketCounts.finalizados++;
      });

      return {
        user_id: user.user_id,
        nombre_completo: `${user.profile?.name || ''} ${
          user.profile?.lastname || ''
        }`,
        email: user.email,
        ...ticketCounts,
      };
    });
  } catch (error) {
    console.error('Error al obtener datos de administradores:', error);
    throw error;
  }
};
const getTicketsByAdmin = async (userId) => {
  try {
    const tickets = await AdminTicket.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Request,
          as: 'request',
          required: true,
          attributes: [
            'request_id',
            'title',
            'attention_time',
            'state_id',
            'number_ticket',
            'created_at',
          ],
          include: [
            {
              model: State,
              as: 'state',
              required: true,
              attributes: ['name'],
              where: {
                name: ['PENDIENTE', 'EN PROCESO'],
              },
            },
          ],
        },
        {
          model: User,
          as: 'adminUser',
          required: true,
          attributes: ['email'],
          include: [
            {
              model: Profile,
              as: 'profile',
              required: true,
              attributes: ['name', 'lastname'],
            },
          ],
        },
      ],
      order: [[{ model: Request, as: 'request' }, 'created_at', 'DESC']],
    });

    // Formatear los resultados en el formato plano solicitado
    const formattedTickets = tickets.map((ticket) => {
      return {
        adminticket_id: ticket.adminticket_id,
        user_id: ticket.user_id,
        request_id: ticket.request_id,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        request_id: ticket.request.request_id,
        title: ticket.request.title,
        attention_time: ticket.request.attention_time,
        state_id: ticket.request.state_id,
        number_ticket: ticket.request.number_ticket,
        created_at_request: ticket.request.created_at,
        state: ticket.request.state ? ticket.request.state.name : null,
        email: ticket.adminUser.email,
        name: ticket.adminUser.profile.name,
        lastname: ticket.adminUser.profile.lastname,
      };
    });

    return formattedTickets;
  } catch (error) {
    console.error('Error en getTicketsByAdmin:', error);
    throw error;
  }
};

module.exports = { getAdminUsersWithTicketCounts, getTicketsByAdmin };
