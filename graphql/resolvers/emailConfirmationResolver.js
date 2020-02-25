const User = require("../../model/User");
const { verifyToken } = require("../operations/verifyToken");

module.exports = {
  confirmEmail: async ({ token, email }, { req, res }) => {
    try {
      await verifyToken(token);
      await User.findOneAndUpdate(
        { email: email },
        { $set: { isEmailConfirmed: true } },
        { new: true }
      ).exec();
    } catch (err) {
      if (err) throw new Error(err);
    }
    return "ok";
  }
};
