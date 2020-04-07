const nodemailer = require("nodemailer");
const {
  IdClient,
  clientSecret,
  emailNewPasswordId,
  emailNewPassAccessToken,
  emailNewPassRefreshToken,
  emailNewPassExpiryToken,
} = require("../../../security/Security");

const remindPassTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: emailNewPasswordId,
    clientId: IdClient,
    clientSecret: clientSecret,
    refreshToken: emailNewPassRefreshToken,
    accessToken: emailNewPassAccessToken,
    expires: emailNewPassExpiryToken,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = { remindPassTransporter };
