const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../config/security/Security");
const User = require("../../../model/User");

const generateToken = (email) => {
  return new Promise(async (resolve) => {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          jwtSecret
        );
        resolve(token);
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { generateToken };
