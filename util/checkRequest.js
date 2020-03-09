const fs = require("fs");

const checkRequest = () => {
  setInterval(() => {
    let countIps = {};
    fs.readFile("loginIps.txt", (err, data) => {
      if (err) throw err;
      if (data !== null) {
        let loginIps = data.toString().split("\n");
        for (loginIp in loginIps) {
          countIps[loginIps[loginIp]] = (countIps[loginIps[loginIp]] || 0) + 1;
        }
        for (ip in countIps) {
          if (countIps[ip] >= 10) {
            fs.appendFile("loginIpsBlackListed.txt", ip + "\n", err => {
              if (err) throw err;
            });
          }
        }
        fs.writeFile("loginIps.txt", "", () => {});
      }
    });
  }, 10000);
};

module.exports = checkRequest;
