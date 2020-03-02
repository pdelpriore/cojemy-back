const {
  emailContactTransporter
} = require("../../../config/nodemailer/transporters/contact/ContactTransporter");
const { emailContactId } = require("../../../config/security/Security");
const { strings } = require("../../../strings/Strings");

const sendCustomerContactEmail = async (subject, email, content) => {
  const customerContactEmailSent = await new Promise((resolve, reject) => {
    const mailOptions = {
      from: `${emailContactId}`,
      to: strings.path.SERVICE_EMAIL,
      subject: "Quoi Manger ? - Customer Contact Email",
      html: `<!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            href="https://fonts.googleapis.com/css?family=Nunito:400,600&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
          />
          <title></title>
        </head>
        <body style="background-color: #A7FF83;">
          <h3
            style="font-size: 24px; font-family: 'Nunito'; font-weight: 600; color: #071A52; text-align: center; margin-bottom: 2%;"
          >
            Customer Contact Email
          </h3>
          <p
            style="font-size: 20px; font-family: 'Open Sans'; font-weight: 400; color: #071A52; text-align: center; margin-bottom: 1%;"
          >
            Sujet: ${subject}
          </p>
          <p
            style="font-size: 20px; font-family: 'Open Sans'; font-weight: 400; color: #071A52; text-align: center; margin-bottom: 1%;"
          >
            Expéditeur: ${email}
          </p>
          <p
            style="font-size: 20px; font-family: 'Open Sans'; font-weight: 600; color: #071A52; text-align: center;"
          >
            Content:
          </p>
          <p
            style="font-size: 22px; font-family: 'Open Sans'; font-weight: 300; color: #071A52; word-wrap: break-word; white-space: pre-wrap;"
          >
            ${content}
          </p>
        </body>
      </html>`
    };
    emailContactTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        throw new Error(err);
      } else if (info) {
        resolve();
        emailContactTransporter.close();
      }
    });
  });
  return customerContactEmailSent;
};

module.exports = { sendCustomerContactEmail };
