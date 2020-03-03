const { isUserExist } = require("../operations/verification/isUserExist");
const {
  isPasswordCorrect
} = require("../operations/verification/isPasswordCorrect");
const {
  isEmailConfirmed
} = require("../operations/verification/isEmailConfirmed");
const { generateToken } = require("../operations/token/generateToken");

module.exports = {
  login: async ({ email, password }) => {
    try {
      const user = await isUserExist(email);
      await isEmailConfirmed(email);
      await isPasswordCorrect(email, password);
      const token = await generateToken(user.email);
      console.log(token);
      return user;
    } catch (err) {
      if (err) throw new Error(err);
    }
  }
};
