const User = require("../../../model/User");
const generator = require("generate-password");
const { hashPassword } = require("./hashPassword");

const setNewPassword = (email) => {
  return new Promise(async (resolve) => {
    try {
      let newPassword = generator.generate({
        length: 10,
        numbers: true,
      });
      let newPasswordHashed = await hashPassword(newPassword);
      let user = await User.findOneAndUpdate(
        { email: email },
        { $set: { password: newPasswordHashed } },
        { new: true }
      ).exec();
      resolve({ userWithNewPassword: user, newPassword: newPassword });
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { setNewPassword };
