const fs = require("fs");
const path = require("path");

const removeImage = (imageName) => {
  fs.unlink(
    path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      "imgs",
      "recipes",
      `${imageName}`
    ),
    (err) => {
      if (err) console.log(err);
    }
  );
};

module.exports = { removeImage };
