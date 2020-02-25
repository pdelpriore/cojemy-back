const nodemailer = require("nodemailer");

const {
  emailConfirmId,
  IdClient,
  clientSecret,
  emailConfirmRefreshToken,
  emailConfirmAccessToken,
  emailConfirmExpiryToken
} = require("../security/Security");

const emailConfirmTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: emailConfirmId,
    clientId: IdClient,
    clientSecret: clientSecret,
    refreshToken: emailConfirmRefreshToken,
    accessToken: emailConfirmAccessToken,
    expires: emailConfirmExpiryToken
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = { emailConfirmTransporter };
