const nodemailer = require("nodemailer");
const {
  IdClient,
  clientSecret,
  gmailAddress,
  gmailAccessToken,
  gmailRefreshToken,
  gmailExpirationToken,
} = require("../../../security/Security");

const emailConfirmTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: gmailAddress,
    clientId: IdClient,
    clientSecret: clientSecret,
    refreshToken: gmailRefreshToken,
    accessToken: gmailAccessToken,
    expires: gmailExpirationToken,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = { emailConfirmTransporter };
