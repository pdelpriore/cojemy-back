const fs = require("fs");
const path = require("path");

const removeImage = (imageName, type) => {
  fs.unlink(
    path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      "imgs",
      `${type}`,
      `${imageName}`
    ),
    (err) => {
      if (err) console.log(err);
    }
  );
};

module.exports = { removeImage };
