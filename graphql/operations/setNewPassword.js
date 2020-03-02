const User = require("../../model/User");
const generator = require("generate-password");
const { hashPassword } = require("./hashPassword");

const setNewPassword = async email => {
  const newPasswordSet = await new Promise(async (resolve, reject) => {
    let newPassword = generator.generate({
      length: 10,
      numbers: true
    });
    let newPasswordHashed = await hashPassword(newPassword);
    try {
      let user = await User.findOneAndUpdate(
        { email: email },
        { $set: { password: newPasswordHashed } },
        { new: true }
      ).exec();
      resolve(user);
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
  return newPasswordSet;
};

module.exports = { setNewPassword };
