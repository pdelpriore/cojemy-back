const {
  gmailTransporter,
} = require("../../../config/nodemailer/transporters/gmail/gmailTransporter");
const { gmailAddress } = require("../../../config/security/Security");
const { strings } = require("../../../strings/Strings");

const sendCustomerContactEmail = (subject, email, content) => {
  return new Promise((resolve) => {
    const mailOptions = {
      from: `${gmailAddress}`,
      to: strings.path.SERVICE_EMAIL,
      subject: "Co Jemy ? - Customer Contact Email",
      html: `<!DOCTYPE html>
      <html lang="pl">
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
        <body style="background-color: #e2f3f5;">
          <h3
            style="
              font-size: 24px;
              font-family: 'Nunito';
              font-weight: 600;
              color: #2e303f;
              text-align: center;
              margin-bottom: 2%;
            "
          >
            Customer Contact Email
          </h3>
          <p
            style="
              font-size: 20px;
              font-family: 'Open Sans';
              font-weight: 400;
              color: #2e303f;
              text-align: center;
              margin-bottom: 1%;
            "
          >
            Temat: ${subject}
          </p>
          <p
            style="
              font-size: 20px;
              font-family: 'Open Sans';
              font-weight: 400;
              color: #2e303f;
              text-align: center;
              margin-bottom: 1%;
            "
          >
            Nadawca: ${email}
          </p>
          <p
            style="
              font-size: 20px;
              font-family: 'Open Sans';
              font-weight: 400;
              color: #2e303f;
              text-align: center;
            "
          >
            Treść:
          </p>
          <p
            style="
              font-size: 22px;
              font-family: 'Open Sans';
              font-weight: 300;
              color: #2e303f;
              word-wrap: break-word;
              white-space: pre-wrap;
            "
          >
            ${content}
          </p>
        </body>
      </html>
      `,
    };
    gmailTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else if (info) {
        resolve();
        gmailTransporter.close();
      }
    });
  });
};

module.exports = { sendCustomerContactEmail };
