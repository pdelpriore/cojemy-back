const User = require("../../model/User");
const {
  validateNewPassForm
} = require("../operations/validation/validateNewPassForm");
const { setNewPassword } = require("../operations/password/setNewPassword");
const { sendNewPassword } = require("../operations/email/sendNewPassword");
const { strings } = require("../../strings/Strings");
const { capitalizeFirst } = require("../../util/Util");

module.exports = {
  remindPassword: async ({ email }) => {
    try {
      await validateNewPassForm(email);
      const user = await User.findOne({ email: email });
      if (user === null) {
        throw new Error(capitalizeFirst(strings.errors.remindPass.USER_NULL));
      } else {
        const result = await setNewPassword(user.email);
        await sendNewPassword(
          result.user.name,
          result.newPassword,
          result.user.email
        );
        return strings.remindPass.PASSWORD_SENT;
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  }
};
