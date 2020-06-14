const {
  remindPassTransporter,
} = require("../../../config/nodemailer/transporters/remindPass/RemindPassTransporter");
const { emailNewPasswordId } = require("../../../config/security/Security");

const sendNewPassword = (name, password, email) => {
  return new Promise((resolve) => {
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
        <body>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td>
                <table
                  style="background-color: #e2f3f5;"
                  border="0"
                  cellspacing="10"
                  cellpadding="0"
                >
                  <tr>
                    <td align="center">
                      <p
                        style="font-size: 22px; font-family: 'Nunito'; font-weight: 600; color: #000000;"
                      >
                        Bonjour ${name} !
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p
                        style="font-size: 16px; font-family: 'Open Sans'; font-weight: 400; color: #0e153a;"
                      >
                        Je te fournis ton nouveau mot de passe. Tu pourras le modifier
                        à tout moment.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p
                        style="margin: 0 auto; background-color: #22d1ee; border-radius: 5px; width: 35%; padding: 10px; border: 2px #3d5af1 solid; font-size: 18px; font-family: 'Open Sans'; font-weight: 600; color: #0e153a; text-align: center; margin-bottom: 1%;"
                      >
                        ${password}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
      `,
    };
    remindPassTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else if (info) {
        resolve();
        remindPassTransporter.close();
      }
    });
  });
};

module.exports = { sendNewPassword };
