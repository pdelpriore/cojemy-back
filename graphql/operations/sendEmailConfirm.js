const {
  emailConfirmTransporter
} = require("../../config/nodemailer/Transporter");
const { emailConfirmId } = require("../../config/security/Security");

const sendEmailConfirm = async (email, token) => {
  const confirmEmailSent = await new Promise((resolve, reject) => {
    const url = `http://localhost:4000/graphql?query=%7B%0A%20%20confirmEmail(token%3A%20%22${token}%22%2C%20email%3A%20%22${email}%22)%20%0A%7D`;
    const mailOptions = {
      from: `${emailConfirmId}`,
      to: email,
      subject: "Mail de confirmation",
      html: `<a href="${url}">Merci de cliquer ici pour confirmer votre adresse email.</a>`
    };
    emailConfirmTransporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        throw new Error(err);
      } else if (info) {
        resolve();
        emailConfirmTransporter.close();
      }
    });
  });
  return confirmEmailSent;
};

module.exports = { sendEmailConfirm };
