const {
  getAdminUsersWithTicketCounts,
  getTicketsByAdmin,
  getTicketsByUserId,
} = require('../../services/superadmin/superadminService.js');

const listAdminUsersWithTickets = async (req, res) => {
  try {
    const result = await getAdminUsersWithTicketCounts();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error interno al listar usuarios administradores.' });
  }
};

const getAdminTickets = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ message: 'Se requiere el ID del usuario administrador' });
    }

    const tickets = await getTicketsByAdmin(userId);
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error en getAdminTickets:', error);
    res.status(500).json({
      message: 'Error interno al obtener los tickets del administrador',
      error: error.message,
    });
  }
};

module.exports = { listAdminUsersWithTickets, getAdminTickets };
