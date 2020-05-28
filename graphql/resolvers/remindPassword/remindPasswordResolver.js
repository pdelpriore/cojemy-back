const {
  validateNewPassForm,
} = require("../../operations/validation/validateNewPassForm");
const { isUserExist } = require("../../operations/verification/isUserExist");
const { setNewPassword } = require("../../operations/password/setNewPassword");
const { sendNewPassword } = require("../../operations/email/sendNewPassword");
const { strings } = require("../../../strings/Strings");

module.exports = {
  remindPassword: async ({ email }) => {
    try {
      await validateNewPassForm(email);
      const user = await isUserExist(email);
      if (!user.isGoogleUser) {
        const { userWithNewPassword, newPassword } = await setNewPassword(
          user.email
        );
        await sendNewPassword(
          userWithNewPassword.name,
          newPassword,
          userWithNewPassword.email
        );
        return strings.remindPass.PASSWORD_SENT;
      } else if (user.isGoogleUser) {
        throw new Error(strings.errors.validateChangePasswordForm.USER_GOOGLE);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
