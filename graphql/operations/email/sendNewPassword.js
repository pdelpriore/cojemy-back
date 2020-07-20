const {
  gmailTransporter,
} = require("../../../config/nodemailer/transporters/gmail/gmailTransporter");
const { gmailAddress } = require("../../../config/security/Security");

const sendNewPassword = (name, password, email) => {
  return new Promise((resolve) => {
    const mailOptions = {
      from: `${gmailAddress}`,
      to: email,
      subject: "Co Jemy ? - Twoje nowe haslo",
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
        <body>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td>
                <table
                  style="background-color: #2e303f;"
                  border="0"
                  cellspacing="10"
                  cellpadding="0"
                >
                  <tr>
                    <td align="center">
                      <p
                        style="
                          font-size: 22px;
                          font-family: 'Nunito';
                          font-weight: 400;
                          color: #ffffff;
                        "
                      >
                        Witaj ${name} !
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p
                        style="
                          font-size: 16px;
                          font-family: 'Open Sans';
                          font-weight: 400;
                          color: #ffffff;
                        "
                      >
                        Oto twoje nowe hasło. Będziesz mógł je później zmienić.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p
                        style="
                          margin: 0 auto;
                          background-color: #22d1ee;
                          border-radius: 5px;
                          width: 35%;
                          padding: 10px;
                          border: 2px #0e153a solid;
                          font-size: 18px;
                          font-family: 'Open Sans';
                          font-weight: 600;
                          color: #0e153a;
                          text-align: center;
                          margin-bottom: 1%;
                        "
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

module.exports = { sendNewPassword };
