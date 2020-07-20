const {
  gmailTransporter,
} = require("../../../config/nodemailer/transporters/gmail/gmailTransporter");
const { gmailAddress } = require("../../../config/security/Security");

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
      : "http://localhost:4000/imgs/recipes/recipeDefaultPhoto.jpg";
    const userPhoto = userImagePath
      ? `http://localhost:4000/${userImagePath}`
      : "http://localhost:4000/imgs/users/userDefaultPhoto.png";
    const url = "http://localhost:3000/myevents";

    const mailOptions = {
      from: `${gmailAddress}`,
      to: emailList,
      subject: `Co Jemy ? - Uzytkownik ${name} organizuje nowe wydarzenie kulinarne`,
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
                  style="background-color: #fff98c;"
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
                          font-weight: 600;
                          color: #000000;
                        "
                      >
                        Nowe wydarzenie kulinarne !
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        display: flex;
                        justify-content: space-evenly;
                        align-items: center;
                        flex-direction: row;
                      "
                      align="center"
                    >
                      <img
                        style="width: 60px; height: 60px; border-radius: 50%;"
                        src="cid:eventPhoto"
                      />
                      <div
                        style="
                          font-size: 16px;
                          font-family: 'Nunito';
                          font-weight: 600;
                          color: #000000;
                          margin-left: 5%;
                        "
                      >
                        ${title}
                        ${city}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p
                        style="
                          font-size: 16px;
                          font-family: 'Open Sans';
                          color: #000000;
                        "
                      >
                        Dodane przez:
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        display: flex;
                        justify-content: space-evenly;
                        align-items: center;
                        flex-direction: row;
                      "
                      align="center"
                    >
                      <img
                        style="width: 40px; height: 40px; border-radius: 50%;"
                        src="cid:userPhoto"
                      />
                      <div
                        style="
                          font-size: 16px;
                          font-family: 'Nunito';
                          font-weight: 600;
                          color: #000000;
                          margin-left: 5%;
                        "
                      >
                        ${name}
                      </div>
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
                          background-color: #f11213;
                          border-top: 12px solid #f11213;
                          border-bottom: 12px solid #f11213;
                          border-right: 18px solid #f11213;
                          border-left: 18px solid #f11213;
                          display: inline-block;
                          margin-top: 10%;
                        "
                        >Sprawdz</a
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
