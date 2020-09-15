const nodemailer = require("nodemailer");
require("dotenv").config();

const gmailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_ADDRESS,
    clientId: process.env.ID_CLIENT,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    accessToken: process.env.GMAIL_ACCESS_TOKEN,
    expires: process.env.GMAIL_EXPIRATION_TOKEN,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = { gmailTransporter };
