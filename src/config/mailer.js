const { createTransport } = require("nodemailer");

let transporter = createTransport({
     service: process.env.MAILER_SERVICE,
     host: process.env.MAILER_HOST,
     port: 465,
     auth: {
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAILER_PASSWORD,
     },
     tls: {
          rejectUnauthorized: false,
     },
});

module.exports = transporter;
