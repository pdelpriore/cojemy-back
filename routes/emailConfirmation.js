const User = require("../model/User");
const { verifyToken } = require("../shared/verifyToken");
const { strings } = require("../strings/Strings");
const { capitalizeFirst } = require("../util/Util");

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
      if (user)
        res
          .cookie("emailConfirmed", strings.emailConfirmed.EMAIL_CONFIRMED)
          .redirect(strings.path.REDIRECT);
    } catch (err) {
      if (err)
        res.status(401).send(capitalizeFirst(strings.errors.token.ERROR));
    }
  });
};
