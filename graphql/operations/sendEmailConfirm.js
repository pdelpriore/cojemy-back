const {
  emailConfirmTransporter
} = require("../../config/nodemailer/Transporter");
const { emailConfirmId } = require("../../config/security/Security");

const sendEmailConfirm = async (email, token) => {
  const confirmEmailSent = await new Promise((resolve, reject) => {
    const tokenStr = `${token}`;
    const mailOptions = {
      from: `${emailConfirmId}`,
      to: email,
      subject: "Mail de confirmation",
      html: `Ton token value = ${tokenStr}`
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
