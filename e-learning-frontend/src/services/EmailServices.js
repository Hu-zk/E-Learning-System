const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your.email@gmail.com',
        pass: 'your-app-specific-password',
    },
    });

    const sendEmail = (to, subject, html) => {
    const mailOptions = {
        from: 'your.email@gmail.com',
        to,
        subject,
        html,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
