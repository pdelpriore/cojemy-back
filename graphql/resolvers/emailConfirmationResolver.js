const User = require("../../model/User");
const { verifyToken } = require("../operations/verifyToken");

module.exports = {
  confirmEmail: async ({ token, email }) => {
    await verifyToken(token);
    await User.findOneAndUpdate(
      { email: email },
      { $set: { isEmailConfirmed: true } },
      { new: true }
    ).exec();
    return "ok";
  }
};
