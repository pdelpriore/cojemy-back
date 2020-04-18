const User = require("../../../model/User");
const { hashPassword } = require("../../operations/password/hashPassword");
const {
  validateSignupForm,
} = require("../../operations/validation/validateSignUpForm");
const { strings } = require("../../../strings/Strings");
const { capitalizeFirst } = require("../../../util/Util");
const { generateToken } = require("../../operations/token/generateToken");
const { sendEmailConfirm } = require("../../operations/email/sendEmailConfirm");

module.exports = {
  signUp: async ({ name, email, confirmEmail, password }) => {
    try {
      const user = await User.findOne({ email: email }, { password: 0 });
      if (user) {
        throw new Error(capitalizeFirst(strings.errors.signup.USER_EXISTS));
      } else {
        await validateSignupForm(name, email, confirmEmail, password);
        let passwordHashed = await hashPassword(password);
        let user = new User({
          name: name,
          email: email.toLowerCase(),
          password: passwordHashed,
          isEmailConfirmed: false,
          isGoogleUser: false,
          isPremium: false,
          creationDate: new Date(),
        });
        await user.save();
        let token = await generateToken(email);
        await sendEmailConfirm(name, email, token);
        return user;
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
