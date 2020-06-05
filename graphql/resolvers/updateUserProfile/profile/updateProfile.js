const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const {
  validateUserUpdateProfileForm,
} = require("../../../operations/validation/validateUserUpdateProfileForm");
const { checkUserImage } = require("../../../operations/image/checkUserImage");
const { hideUserPassword } = require("../../../../shared/hideUserPassword");

module.exports = {
  updateUserProfile: async ({ name, profileImage, email }, { req }) => {
    try {
      await verifyToken(email, req.cookies.id);
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
