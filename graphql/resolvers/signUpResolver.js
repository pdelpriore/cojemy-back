const User = require("../../model/User");
const { hashPassword } = require("../operations/hashPassword");
const { strings } = require("../../strings/Strings");
const { capitalizeFirst } = require("../../util/Util");

module.exports = {
  signUp: async ({ userInput: { name, email, password } }) => {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        throw new Error(capitalizeFirst(strings.errors.signup.USER_EXISTS));
      } else {
        let passwordHashed = await hashPassword(password);
        let user = new User({
          name: name,
          email: email,
          password: passwordHashed
        });
        return await user.save();
      }
    } catch (err) {
      if (err) throw err;
    }
  }
};
