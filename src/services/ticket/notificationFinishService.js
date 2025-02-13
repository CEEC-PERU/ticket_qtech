
const Request = require('../../models/Request.js');
const User = require('../../models/User.js');
const Profile = require('../../models/Profile.js');
const { sendMail } = require('../../utils/mailer');
const notificationService = {
 
    
    async notifyUserFinalized(request_id, time_finalizado) {
      try {
        // Find the request by request_id
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
              }
        });
  
        if (!request) {
          console.warn(`No se encontró la solicitud con request_id: ${request_id}`);
          return;
        }
  
        const { title } = request;
        const user = request.user;
        const userName = `${user.profile.name} ${user.profile.lastname}`;
        const userEmail = user.email;
  
        // Create the email content for the user notification
        const userHtml = `
          <div style="text-align: center; font-family: Arial, sans-serif;">
            <img src="https://res.cloudinary.com/dk2red18f/image/upload/v1736456728/Ticket-Qtech/qezajo2gt28smeku6e7e.png" alt="Logo de Plataforma de Tickets" style="max-width: 150px; margin: 20px auto;" />
            <h2 style="color:rgb(119, 76, 175);">Tu Solicitud ha sido Finalizada</h2>
            <p style="font-size: 18px;">Hola ${userName},</p>
            <p style="font-size: 16px;">Tu solicitud ha sido finalizada exitosamente. Aquí están los detalles:</p>
            <table style="margin: 0 auto; text-align: left; font-size: 16px;">
              <tr>
                <td style="padding: 5px 10px;">Título:</td>
                <td><strong>${title}</strong></td>
              </tr>
              <tr>
                <td style="padding: 5px 10px;">Fecha de Finalización:</td>
                <td>${time_finalizado}</td>
              </tr>
            </table>
            <p style="font-size: 16px; margin-top: 20px;">Gracias por usar nuestra plataforma.</p>
             <p><strong>Link de Web : </strong> https://ticket-front-knnb.vercel.app/login </p>
            <p style="font-size: 14px; color: #555;">Saludos,<br>Plataforma de Tickets</p>
          </div>
        `;
  
        const defaultAdminEmails = ['kcadenillas@multigestion.com.pe', 'ezavaleta@multigestion.com.pe'];
        const allAdminEmails = [userEmail, ...defaultAdminEmails];
        // Send the email to the user
        await sendMail(allAdminEmails, `Solicitud Finalizada: ${title}`, '', userHtml);
        console.log('Correo enviado al usuario:', allAdminEmails);
      } catch (error) {
        console.error('Error enviando notificación al usuario:', error.message);
      }
    },
  };
  
  module.exports = notificationService;
  