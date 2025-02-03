
const Request = require('../../models/Request');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { sendMail } = require('../../utils/mailer');

const notificationRejectionService = {
  async notifySolicitante(data) {
    try {
      const { request_id, reason, user_id } = data;

      // Obtener información del solicitante
      const request = await Request.findByPk(request_id, {
        include: {
          model: User,
          as: 'user',
          attributes: ['email'],
          include: [{
            model: Profile,
            attributes: ['name', 'lastname'],
            as: 'profile',
          }],
        },
      });

      if (!request || !request.user) {
        throw new Error('No se encontró la solicitud o el usuario asociado.');
      }

      const solicitanteEmail = request.user.email;
      const solicitanteName = request.user.profile?.name || 'Usuario';

      // Obtener información del administrador que rechazó la solicitud
      const adminUser = await User.findByPk(user_id, {
        include: [{
          model: Profile,
          attributes: ['name', 'lastname'],
          as: 'profile',
        }],
      });

      if (!adminUser) {
        throw new Error('No se encontró al usuario administrador.');
      }

      const adminName = adminUser.profile?.name || 'Administrador';
      const adminEmail = adminUser.email;

      // Construcción del correo
      const subject = 'Notificación de solicitud rechazada';
      const htmlContent = `
        <div style="font-family: Arial, sans-serif;">
          <img src="https://res.cloudinary.com/dk2red18f/image/upload/v1736456728/Ticket-Qtech/qezajo2gt28smeku6e7e.png" alt="Logo de Plataforma de Tickets" style="max-width: 150px; margin: 20px auto;" />
          <h2 style="color:rgb(119, 76, 175);">Su solicitud ha sido rechazada</h2>
          <p>Estimado/a <strong>${solicitanteName}</strong>,</p>
          <p>Lamentamos informarle que su solicitud con ID <strong>${request_id}</strong> ha sido rechazada por <strong>${adminName}</strong>.</p>
          <p><strong>Razón del rechazo:</strong> ${reason}</p>
          <p>Si tiene alguna duda, puede comunicarse con el administrador.</p>
        </div>
      `;

      // Enviar correo al solicitante
      await sendMail(solicitanteEmail, subject, 'Su solicitud ha sido rechazada', htmlContent);
      
      // Enviar correo al administrador (confirmación de envío)
      const adminHtmlContent = `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color:rgb(119, 76, 175);">Confirmación de rechazo</h2>
          <p>Hola <strong>${adminName}</strong>,</p>
          <p>Has rechazado la solicitud con ID <strong>${request_id}</strong> enviada por <strong>${solicitanteName}</strong>.</p>
          <p><strong>Razón del rechazo:</strong> ${reason}</p>
        </div>
      `;

      await sendMail(adminEmail, 'Confirmación de rechazo de solicitud', 'Has rechazado una solicitud', adminHtmlContent);
      
    } catch (error) {
      console.error('Error al enviar notificación de rechazo:', error);
    }
  }
};

module.exports = notificationRejectionService;
