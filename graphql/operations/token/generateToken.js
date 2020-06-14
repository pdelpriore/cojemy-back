const jwt = require("jsonwebtoken");
import * as jwtEncrypt from "jwt-token-encrypt";
const {
  jwtSecret,
  jwtEncryptionKey,
} = require("../../../config/security/Security");
const User = require("../../../model/User");

const generateToken = (email) => {
  return new Promise(async (resolve) => {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        // const token = jwt.sign(
        //   { userId: user._id, email: user.email },
        //   jwtSecret
        // );
        // resolve(token);
        const token = await jwtEncrypt.generateJWT(
          {
            secret: jwtSecret,
          },
          {
            role: "user",
          },
          {
            key: jwtEncryptionKey,
            algorithm: "aes-256-cbc",
          },
          {
            userId: user._id,
            email: email,
          }
        );
        resolve(token);
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { generateToken };
