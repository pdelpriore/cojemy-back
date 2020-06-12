const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const {
  validateUserUpdateProfileForm,
} = require("../../../operations/validation/validateUserUpdateProfileForm");
const { checkUserImage } = require("../../../operations/image/checkUserImage");
const { hideUserPassword } = require("../../../../shared/hideUserPassword");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  updateUserProfile: async ({ name, profileImage, userId, email }, { req }) => {
    try {
      await verifyToken(
        userId,
        email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      await validateUserUpdateProfileForm(name, profileImage);
      const imagePath = await checkUserImage(email, profileImage);

      const userUpdated = await User.findOneAndUpdate(
        { email: email },
        { $set: { name: name, photo: imagePath } },
        { new: true }
      ).exec();

      return hideUserPassword(userUpdated);
    } catch (err) {
      if (err) throw err;
    }
  },
};
