const User = require("../model/User");
const { verifyToken } = require("../graphql/operations/token/verifyToken");
const { strings } = require("../strings/Strings");

module.exports = (app) => {
  app.get(strings.path.EMAIL_CONFIRM, async (req, res) => {
    try {
      await verifyToken(
        null,
        req.params.email,
        req.params.token,
        strings.tokenVerification.EMAIL_CONFIRM
      );
      const user = await User.findOneAndUpdate(
        { email: req.params.email },
        { $set: { isEmailConfirmed: true } },
        { new: true }
      ).exec();
      if (user) res.redirect(strings.path.REDIRECT_LOGIN);
    } catch (err) {
      if (err) throw err;
    }
  });
};
