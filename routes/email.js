const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/send-email', (req, res) => {
  const formData = req.body;

  sendEmail(formData)
    .then(() => res.status(200).send('Email sent successfully'))
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error in sending email');
    });
});

const sendEmail = async (formData) => {
  const msg = {
    to: 'contact@pampilmousse.fr', // Replace with your professional email
    from: 'contact@hedz.space', // Replace with your verified SendGrid email
    subject: 'Nouveau message depuis pampilmousse.fr',
    text: `
      Nom: ${formData.name}
      Email: ${formData.email}
      Message: ${formData.message}
    `,
  };

  return await sgMail.send(msg);
};

module.exports = router;
