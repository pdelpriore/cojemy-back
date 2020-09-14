const {
  gmailTransporter,
} = require("../../../config/nodemailer/transporters/gmail/gmailTransporter");
const { gmailAddress } = require("../../../config/security/Security");
const { userGooglePhoto } = require("../../../shared/testWords");

const sendFollowEventEmail = (
  name,
  title,
  city,
  emailList,
  userImagePath,
  eventImagePath
) => {
  return new Promise((resolve) => {
    const eventPhoto = eventImagePath
      ? `http://localhost:4000/${eventImagePath}`
      : "http://localhost:4000/imgs/events/eventDefaultPhoto.jpg";
    const userPhoto =
      userImagePath &&
      userGooglePhoto.some(
        (element) => userImagePath && userImagePath.includes(element)
      )
        ? userImagePath
        : userImagePath
        ? `http://localhost:4000/${userImagePath}`
        : "http://localhost:4000/imgs/users/userDefaultPhoto.png";
    const url = "http://localhost:3000/myevents";

    const mailOptions = {
      from: `${gmailAddress}`,
      to: emailList,
      subject: `Co Jemy ? - Użytkownik ${name} organizuje nowe wydarzenie kulinarne`,
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
                  style="background-color: #2e303f; width: 400px"
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
                        Nowe wydarzenie kulinarne !
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <img
                        style="
                          display: inline-block;
                          width: 90px;
                          height: 60px;
                          border-radius: 4px;
                          border: 1px solid #ddd;
                          padding: 5px;
                          vertical-align: middle;
                        "
                        src="cid:eventPhoto"
                      />
                      <div style="display: inline-block; vertical-align: middle;">
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
                          ${title}
                        </p>
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
                          ${city}
                        </p>
                      </div>
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
                        Dodane przez:
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
                        ${name}
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
        {
          filename: "event.jpg",
          path: `${eventPhoto}`,
          cid: "eventPhoto",
        },
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

module.exports = { sendFollowEventEmail };
