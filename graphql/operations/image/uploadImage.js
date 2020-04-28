const fs = require("fs");
const path = require("path");
const randomstring = require("randomstring");
const stream = require("stream");

const uploadImage = async (recipeImage) => {
  const imagePath = await new Promise((resolve, reject) => {
    const imageName = `${randomstring.generate(20)}-${recipeImage.imageName}`;

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
            `${imageName}`
          )
        )
      );

    resolve(`/imgs/recipes/${imageName}`);
  });
  return imagePath;
};

module.exports = { uploadImage };
