const User = require("../../../model/User");
const { strings } = require("../../../strings/Strings");

module.exports = {
  signUpGoogleUser: async ({ name, email, photo }) => {
    try {
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
          creationDate: new Date(),
        });
        await user.save();
        return user;
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
