const nodemailer = require("nodemailer");
const {
  emailContactId,
  IdClient,
  clientSecret,
  emailContactRefreshToken,
  emailContactAccessToken,
  emailContactExpiryToken,
} = require("../../../security/Security");

const emailContactTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: emailContactId,
    clientId: IdClient,
    clientSecret: clientSecret,
    refreshToken: emailContactRefreshToken,
    accessToken: emailContactAccessToken,
    expires: emailContactExpiryToken,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = { emailContactTransporter };
