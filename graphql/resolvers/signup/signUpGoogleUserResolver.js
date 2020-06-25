const User = require("../../../model/User");
const { strings } = require("../../../strings/Strings");
const {
  verifyGoogleIdToken,
} = require("../../operations/token/verifyGoogleIdToken");
const { hideUserPassword } = require("../../../shared/hideUserPassword");

module.exports = {
  signUpGoogleUser: async ({ name, email, photo }, { req }) => {
    try {
      await verifyGoogleIdToken(email, req.get(strings.request.HEADER));
      const user = await User.findOne({ email: email });
      if (user) {
        throw new Error(strings.errors.signupGoogleUser.USER_EXISTS);
      } else {
        let user = new User({
          name: name,
          email: email.toLowerCase(),
          password: strings.signupGoogleUser.NO_PASSWORD,
          photo: photo,
          isEmailConfirmed: true,
          isGoogleUser: true,
          isPremium: false,
          isTrialPeriod: true,
          creationDate: new Date(),
        });
        await user.save();

        return hideUserPassword(user);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
