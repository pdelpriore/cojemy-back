const User = require("../../../../model/User");
const {
  validateChangeUserPasswordForm,
} = require("../../../operations/validation/validateChangeUserPasswordForm");
const {
  isPasswordCorrect,
} = require("../../../operations/verification/isPasswordCorrect");
const { hashPassword } = require("../../../operations/password/hashPassword");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  changeUserPassword: async (
    { currentPass, newPass, confirmPass, userId, email },
    { req }
  ) => {
    try {
      await verifyToken(userId, email, req.cookies.id);
      const user = await User.findOne({ email: email });

      if (!user.isGoogleUser) {
        await isPasswordCorrect(currentPass, user.password);
        await validateChangeUserPasswordForm(newPass, confirmPass);
        const newPasswordHashed = await hashPassword(newPass);

        await User.findOneAndUpdate(
          { email: email },
          { $set: { password: newPasswordHashed } },
          { new: true }
        ).exec();
        return true;
      } else if (user.isGoogleUser) {
        throw new Error(strings.errors.validateChangePasswordForm.USER_GOOGLE);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
