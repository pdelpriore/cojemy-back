const User = require("../../model/User");
const { hashPassword } = require("../operations/hashPassword");
const { validateSignupForm } = require("../operations/validateSignUpForm");
const { strings } = require("../../strings/Strings");
const { capitalizeFirst, dateToString } = require("../../util/Util");
const { generateToken } = require("../operations/generateToken");
const { sendEmailConfirm } = require("../operations/sendEmailConfirm");

module.exports = {
  signUp: async ({ name, email, confirmEmail, password }) => {
    try {
      const user = await User.findOne({ email: email });
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
          creationDate: dateToString(new Date())
        });
        await user.save();
        let token = await generateToken(email);
        //send token
        await sendEmailConfirm(email, token);
        return user;
      }
    } catch (err) {
      if (err) throw err;
    }
  }
};
