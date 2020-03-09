const fs = require("fs");
const { capitalizeFirst } = require("../../../util/Util");
const { strings } = require("../../../strings/Strings");

const protectAgainstHack = async req => {
  const result = await new Promise((resolve, reject) => {
    fs.readFile("loginIpsBlackListed.txt", (err, data) => {
      if (err) throw err;
      if (data !== null) {
        let blackListed = data.toString().split("\n");
        if (blackListed.includes(req.ip)) {
          throw new Error(capitalizeFirst(strings.errors.login.HACK));
        } else {
          fs.appendFile("loginIps.txt", req.ip + "\n", err => {
            if (err) throw err;
            resolve();
          });
        }
      }
    });
  });
  return result;
};

module.exports = { protectAgainstHack };
