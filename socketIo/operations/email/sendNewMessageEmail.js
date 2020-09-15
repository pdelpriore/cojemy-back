const {
  gmailTransporter,
} = require("../../../config/nodemailer/transporters/gmail/gmailTransporter");
const { userGooglePhoto } = require("../../../shared/testWords");
require("dotenv").config();

const sendNewMessageEmail = (userName, userImagePath, recipient) => {
  return new Promise((resolve) => {
    const userPhoto =
      userImagePath &&
      userGooglePhoto.some(
        (element) => userImagePath && userImagePath.includes(element)
      )
        ? userImagePath
        : userImagePath
        ? `http://localhost:4000/${userImagePath}`
        : "http://localhost:4000/imgs/users/userDefaultPhoto.png";
    const url = "http://localhost:3000/mails";

    const mailOptions = {
      from: `${process.env.GMAIL_ADDRESS}`,
      to: recipient,
      subject: `Co Jemy ? - Użytkownik ${userName} wyslal Ci nowa wiadomosc`,
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
                          Nowa wiadomosc !
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
                          Wyslana przez:
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        <img
                          style="
                            display: inline-block;
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            vertical-align: middle;
                          "
                          src="cid:userPhoto"
                        />
                        <p
                          style="
                            display: inline;
                            font-size: 16px;
                            font-family: 'Nunito';
                            font-weight: 400;
                            color: #ffffff;
                            margin-left: 5%;
                          "
                        >
                          ${userName}
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
                            margin-top: 10%;
                          "
                          >Sprawdź</a
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
      attachments: [
        { filename: "user.png", path: `${userPhoto}`, cid: "userPhoto" },
      ],
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

module.exports = { sendNewMessageEmail };
