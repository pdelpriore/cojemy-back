const fs = require("fs");
const path = require("path");
const randomstring = require("randomstring");

const uploadImage = async (recipeImage) => {
  const imagePath = await new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(
        __dirname,
        "..",
        "..",
        "..",
        "uploads",
        "imgs",
        "recipes",
        `${randomstring.generate(20)}_${recipeImage.imageName}`
      ),
      recipeImage.image.replace(/^data:image\/\w+;base64,/, ""),
      { encoding: "base64" },
      (err, data) => {
        if (err) console.log(err);
        if (data) console.log(data);
      }
    );
  });
  return imagePath;
};

module.exports = { uploadImage };
