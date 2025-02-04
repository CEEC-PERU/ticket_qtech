const AdminManagement = require('../../models/AdminManagement');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { sendMail } = require('../../utils/mailer');

const notificationService = {
  async notifyAdmins(request) {
    try {
      const { title, management_id, number_ticket, created_at, user_id } = request;

      // Filtrar administradores relacionados con el `management_id`
      const adminUsers = await AdminManagement.findAll({
        where: { management_id },
        include: [
          {
            model: User,
            attributes: ['email'],
            as: 'user',
          },
        ],
      });

      // Obtener información del usuario que creó la solicitud
      const user = await User.findByPk(user_id, {
        include: [
          {
            model: Profile,
            attributes: ['name', 'lastname'],
            as: 'profile',
          },
        ],
      });

      const adminEmails = adminUsers.map(admin => admin.user.email);
       // Añadir los correos predeterminados a los correos de los administradores
       const defaultAdminEmails = ['kcadenillas@multigestion.com.pe', 'ezavaleta@multigestion.com.pe'];
       const allAdminEmails = [...adminEmails, ...defaultAdminEmails];


      if (allAdminEmails.length === 0) {
        console.warn(`No se encontraron administradores para management_id: ${management_id}`);
        return;
      }

      if (!user || !user.profile.name) {
        console.warn(`No se encontró información para el usuario con user_id: ${user_id}`);
        return;
      }

      const userName = `${user.profile.name} ${user.profile.lastname}`;
      const userEmail = user.email;

      // Contenido del correo para los administradores
      const adminHtml = `
        <div style="text-align: center; font-family: Arial, sans-serif;">
          <img src="https://res.cloudinary.com/dk2red18f/image/upload/v1736456728/Ticket-Qtech/qezajo2gt28smeku6e7e.png" alt="Logo de Plataforma de Tickets" style="max-width: 150px; margin: 20px auto;" />
          <h2 style="color:rgb(119, 76, 175);">Nueva Solicitud en la Plataforma de Tickets</h2>
          <p style="font-size: 18px;">Se ha creado una nueva solicitud.</p>
          <table style="margin: 0 auto; text-align: left; font-size: 16px;">
            <tr>
              <td style="padding: 5px 10px;">Título:</td>
              <td><strong>${title}</strong></td>
            </tr>
            <tr>
              <td style="padding: 5px 10px;">Usuario:</td>
              <td>${userName}</td>
            </tr>
            <tr>
              <td style="padding: 5px 10px;">Número de Ticket:</td>
              <td>${number_ticket}</td>
            </tr>
            <tr>
              <td style="padding: 5px 10px;">Fecha de Creación:</td>
              <td>${created_at}</td>
            </tr>
          </table>
          <p style="font-size: 16px; margin-top: 20px;">Por favor, revisa la plataforma para más información.</p>
          <p style="font-size: 14px; color: #555;">Saludos,<br>Plataforma de Tickets</p>
        </div>
      `;

      // Enviar correo a los administradores
      await sendMail(allAdminEmails.join(',') , `Nueva Solicitud: ${title}`, '', adminHtml);
      console.log('Correos enviados a administradores:', al);

      // Contenido del correo para el usuario que creó la solicitud
      const userHtml = `
        <div style="text-align: center; font-family: Arial, sans-serif;">
          <img src="https://res.cloudinary.com/dk2red18f/image/upload/v1736456728/Ticket-Qtech/qezajo2gt28smeku6e7e.png" alt="Logo de Plataforma de Tickets" style="max-width: 150px; margin: 20px auto;" />
          <h2 style="color:rgb(119, 76, 175);">Tu Solicitud ha sido Registrada</h2>
          <p style="font-size: 18px;">Hola ${userName},</p>
          <p style="font-size: 16px;">Tu solicitud ha sido registrada exitosamente. Aquí están los detalles:</p>
          <table style="margin: 0 auto; text-align: left; font-size: 16px;">
            <tr>
              <td style="padding: 5px 10px;">Título:</td>
              <td><strong>${title}</strong></td>
            </tr>
            <tr>
              <td style="padding: 5px 10px;">Número de Ticket:</td>
              <td>${number_ticket}</td>
            </tr>
            <tr>
              <td style="padding: 5px 10px;">Fecha de Creación:</td>
              <td>${created_at}</td>
            </tr>
             <tr>
              <td style="padding: 5px 10px;">Fecha de Creación:</td>
              <td>https://ticket-front-knnb.vercel.app/login</td>
            </tr>
          </table>
          <p style="font-size: 16px; margin-top: 20px;">Gracias por usar nuestra plataforma.</p>
          <p style="font-size: 14px; color: #555;">Saludos,<br>Plataforma de Tickets</p>
        </div>
      `;

      // Enviar correo al usuario que creó la solicitud
      await sendMail(userEmail, `Solicitud Registrada: ${title}`, '', userHtml);
      console.log('Correo enviado al usuario:', userEmail);
    } catch (error) {
      console.error('Error enviando notificaciones:', error.message);
    }
  },
};

module.exports = notificationService;
