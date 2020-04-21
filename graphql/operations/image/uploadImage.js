const fs = require("fs");
const path = require("path");
const randomstring = require("randomstring");
const stream = require("stream");

const uploadImage = async (recipeImage) => {
  const imagePath = await new Promise((resolve, reject) => {
    new stream.PassThrough()
      .end(
        new Buffer.from(
          recipeImage.image.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        )
      )
      .pipe(
        fs.createWriteStream(
          path.join(
            __dirname,
            "..",
            "..",
            "..",
            "uploads",
            "imgs",
            "recipes",
            `${randomstring.generate(20)}_${recipeImage.imageName}`
          )
        )
      );

    resolve(
      path.join(
        __dirname,
        "..",
        "..",
        "..",
        "uploads",
        "imgs",
        "recipes",
        `${randomstring.generate(20)}_${recipeImage.imageName}`
      )
    );
  });
  return imagePath;
};

module.exports = { uploadImage };
