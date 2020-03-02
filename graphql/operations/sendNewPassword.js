const {
  remindPassTransporter
} = require("../../config/nodemailer/transporters/remindPass/RemindPassTransporter");
const { emailNewPasswordId } = require("../../config/security/Security");

const sendNewPassword = async (name, password, email) => {
  const newPasswordSent = await new Promise((resolve, reject) => {
    const mailOptions = {
      from: `${emailNewPasswordId}`,
      to: email,
      subject: "Quoi Manger ? - Ton nouveau mot de passe",
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
          <body style="background-color: #e2f3f5;">
            <h3
              style="font-size: 24px; font-family: 'Nunito'; font-weight: 600; color: #0e153a; text-align: center; margin-bottom: 2%;"
            >
              Bonjour ${name} !
            </h3>
            <p
              style="font-size: 20px; font-family: 'Open Sans'; font-weight: 400; color: #0e153a; text-align: center; margin-bottom: 3%;"
            >
              Suite à ta demande, on te fournit ton nouveau mot de passe. Tu pourras le
              modifier à tout moment.
            </p>
            <p
              style="margin: 0 auto; background-color: #22d1ee; border-radius: 5px; width: 50%; padding: 20px; border: 2px #3d5af1 solid; font-size: 18px; font-family: 'Open Sans'; font-weight: 600; color: #0e153a; text-align: center; margin-bottom: 1%;"
            >
              ${password}
            </p>
          </body>
        </html>`
    };
    remindPassTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        throw new Error(err);
      } else if (info) {
        resolve();
        remindPassTransporter.close();
      }
    });
  });
  return newPasswordSent;
};

module.exports = { sendNewPassword };
