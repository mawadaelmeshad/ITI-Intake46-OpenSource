const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

async function sendEmail(template, data, to, subject) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const templatePath = path.join(__dirname, '../views/emails', `${template}.ejs`);
  const html = await ejs.renderFile(templatePath, data);

  await transporter.sendMail({
    from: `"Our Platform" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

module.exports = { sendEmail };
