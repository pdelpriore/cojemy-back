const {
  emailConfirmTransporter,
} = require("../../../config/nodemailer/transporters/emailConfirm/EmailConfirmTransporter");
const { emailConfirmId } = require("../../../config/security/Security");

const sendEmailConfirm = (name, email, token) => {
  return new Promise((resolve) => {
    const url = `http://localhost:4000/emailconfirm/${token}/${email}`;
    const mailOptions = {
      from: `${emailConfirmId}`,
      to: email,
      subject: "Quoi Manger ? - Mail de confirmation",
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
                <table style="background-color: #FFF98C;" border="0" cellspacing="10" cellpadding="0">
                  <tr>
                    <td align="center">
                      <p
                        style="font-size: 22px; font-family: 'Nunito'; font-weight: 600; color: #000000;"
                      >
                        Quoi Manger ?
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p
                        style="font-size: 18px; font-weight: 600; font-family: 'Nunito'; color: #000000;"
                      >
                        Bonjour ${name} !
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p
                        style="font-size: 16px; font-family: 'Open Sans'; color: #000000;"
                      >
                        Merci d'avoir enregistré ton compte. Passes des bons moments
                        sur Quoi Manger ?
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <a
                        href="${url}"
                        style="font-size: 16px; font-family: 'Open Sans'; color: #ffffff; text-decoration: none; border-radius: 3px; background-color: #F11213; border-top: 12px solid #F11213; border-bottom: 12px solid #F11213; border-right: 18px solid #F11213; border-left: 18px solid #F11213; display: inline-block;"
                        >Confirme ton email</a
                      >
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`,
    };
    emailConfirmTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else if (info) {
        resolve();
        emailConfirmTransporter.close();
      }
    });
  });
};

module.exports = { sendEmailConfirm };
