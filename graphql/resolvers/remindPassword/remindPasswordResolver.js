const User = require("../../../model/User");
const {
  validateNewPassForm
} = require("../../operations/validation/validateNewPassForm");
const { isUserExist } = require("../../operations/verification/isUserExist");
const { setNewPassword } = require("../../operations/password/setNewPassword");
const { sendNewPassword } = require("../../operations/email/sendNewPassword");
const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");

module.exports = {
  remindPassword: async ({ email }) => {
    try {
      await validateNewPassForm(email);
      const user = await isUserExist(email);
      if (user) {
        const { userWithNewPassword, newPassword } = await setNewPassword(
          user.email
        );
        await sendNewPassword(
          userWithNewPassword.name,
          newPassword,
          userWithNewPassword.email
        );
        return strings.remindPass.PASSWORD_SENT;
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  }
};
