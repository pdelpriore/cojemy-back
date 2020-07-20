const {
  IdClient,
  clientSecret,
  redirectUrl,
  gmailCode,
} = require("../config/security/Security");
const { google } = require("googleapis");

const generateGoogleAuthUrl = () => {
  const oauth2Client = new google.auth.OAuth2(
    IdClient,
    clientSecret,
    redirectUrl
  );

  const GMAIL_SCOPES = [
    "https://mail.google.com/",
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.send",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: GMAIL_SCOPES,
  });

  //console.log(url);

  // let getToken = async () => {
  //   try {
  //     const { tokens } = await oauth2Client.getToken(gmailCode);
  //     console.info(tokens);
  //   } catch (err) {
  //     if (err) console.log(err);
  //   }
  // };

  // getToken();
};

module.exports = generateGoogleAuthUrl;
