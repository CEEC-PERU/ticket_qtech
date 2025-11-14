// src/utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendMail = async (to, subject, text ,html, cc = null) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text ,
        html
    };

    // agregar cc solo si se existe
    if (cc) {
        mailOptions.cc = cc;
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendMail };
