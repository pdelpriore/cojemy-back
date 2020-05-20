const User = require("../../../../model/User");
const { strings } = require("../../../../strings/Strings");
const { capitalizeFirst } = require("../../../../util/Util");
const { verifyToken } = require("../../../operations/token/verifyToken");
const {
  validateUserUpdateProfileForm,
} = require("../../../operations/validation/validateUserUpdateProfileForm");
const { checkUserImage } = require("../../../operations/image/checkUserImage");

module.exports = {
  updateUserProfile: async ({ name, profileImage, email }, { req }) => {
    try {
      const tokenVerified = await verifyToken(email, req.cookies.id);
      if (tokenVerified) {
        await validateUserUpdateProfileForm(name, profileImage);
        const imagePath = await checkUserImage(email, profileImage);

        const userUpdated = await User.findOneAndUpdate(
          { email: email },
          { $set: { name: name, photo: imagePath } },
          { new: true }
        ).exec();
        return userUpdated;
      } else {
        throw new Error(capitalizeFirst(strings.errors.token.ERROR));
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
