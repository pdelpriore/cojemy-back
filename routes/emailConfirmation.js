const User = require("../model/User");
const { verifyToken } = require("../graphql/operations/verifyToken");
const { strings } = require("../strings/Strings");

module.exports = app => {
  app.get(strings.path.EMAIL_CONFIRM, async (req, res) => {
    try {
      await verifyToken(req.params.email, req.params.token);
      const user = await User.findOneAndUpdate(
        { email: req.params.email },
        { $set: { isEmailConfirmed: true } },
        { new: true }
      ).exec();
      if (user) res.redirect(strings.path.REDIRECT_LOGIN);
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};
