const User = require("../../../model/User");
const { hashPassword } = require("../../operations/password/hashPassword");
const {
  validateSignupForm,
} = require("../../operations/validation/validateSignUpForm");
const { strings } = require("../../../strings/Strings");
const { generateToken } = require("../../operations/token/generateToken");
const { sendEmailConfirm } = require("../../operations/email/sendEmailConfirm");

module.exports = {
  signUp: async ({ name, email, confirmEmail, password }) => {
    try {
      const userEmail = await User.findOne({ email: email });
      const userName = await User.findOne({ name: name });
      if (userEmail) {
        throw new Error(strings.errors.signup.USER_EMAIL_EXISTS);
      } else if (userName) {
        throw new Error(strings.errors.signup.USER_NAME_EXISTS);
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
