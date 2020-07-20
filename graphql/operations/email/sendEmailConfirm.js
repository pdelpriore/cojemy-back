const {
  gmailTransporter,
} = require("../../../config/nodemailer/transporters/gmail/gmailTransporter");
const { gmailAddress } = require("../../../config/security/Security");

const sendEmailConfirm = (name, email, token) => {
  return new Promise((resolve) => {
    const url = `http://localhost:4000/emailconfirm/${token}/${email}`;
    const mailOptions = {
      from: `${gmailAddress}`,
      to: email,
      subject: "Co Jemy ? - Potwierdzenie adresu email",
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
                        Co Jemy ?
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p
                        style="
                          font-size: 18px;
                          font-weight: 400;
                          font-family: 'Nunito';
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
                          color: #ffffff;
                        "
                      >
                        Dziękuję za zarejestrowanie konta. Baw się dobrze !
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <a
                        href="${url}"
                        style="
                          font-size: 16px;
                          font-family: 'Open Sans';
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 3px;
                          background-color: crimson;
                          border-top: 12px solid crimson;
                          border-bottom: 12px solid crimson;
                          border-right: 18px solid crimson;
                          border-left: 18px solid crimson;
                          display: inline-block;
                        "
                        >Potwierdź adres mailowy</a
                      >
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

module.exports = { sendEmailConfirm };
