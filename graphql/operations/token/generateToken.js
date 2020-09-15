const jwt = require("jsonwebtoken");
const cryptoJS = require("crypto-js");
const User = require("../../../model/User");
require("dotenv").config();

const generateToken = (email) => {
  return new Promise(async (resolve) => {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET
        );
        resolve(
          cryptoJS.AES.encrypt(token, process.env.JWT_ENCRYPTION_KEY).toString()
        );
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { generateToken };
