const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../config/security/Security");
const User = require("../../../model/User");

const generateToken = async email => {
  const tokenGenerated = await new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: email }, { password: 0 });
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
  return tokenGenerated;
};

module.exports = { generateToken };
