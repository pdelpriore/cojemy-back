const fs = require("fs");
const { strings } = require("../../../strings/Strings");

const protectAgainstHack = async (req) => {
  const result = await new Promise((resolve, reject) => {
    fs.readFile("loginIpsBlackListed.txt", (err, data) => {
      try {
        if (err) console.log(err);
        if (data !== null) {
          let blackListed = data.toString().split("\n");
          if (blackListed.includes(req.ip)) {
            reject(strings.errors.login.HACK);
          } else {
            fs.appendFile("loginIps.txt", req.ip + "\n", (err) => {
              if (err) console.log(err);
              resolve();
            });
          }
        }
      } catch (err) {
        if (err) throw new Error(err);
      }
    });
  });
  return result;
};

module.exports = { protectAgainstHack };
