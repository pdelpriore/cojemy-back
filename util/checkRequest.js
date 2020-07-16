const fs = require("fs");

const checkRequest = () => {
  let countIps = {};
  fs.readFile("loginIps.txt", (err, data) => {
    if (err) console.log(err);
    if (data !== null) {
      let loginIps = data.toString().split("\n");
      for (loginIp in loginIps) {
        countIps[loginIps[loginIp]] = (countIps[loginIps[loginIp]] || 0) + 1;
      }
      for (ip in countIps) {
        if (countIps[ip] >= 10) {
          fs.appendFile("loginIpsBlackListed.txt", ip + "\n", (err) => {
            if (err) console.log(err);
          });
        }
      }
      fs.writeFile("loginIps.txt", "", () => {});
    }
  });
};

module.exports = checkRequest;
