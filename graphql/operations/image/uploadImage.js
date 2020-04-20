const fs = require("fs");
const path = require("path");

const uploadImage = async (recipeImage, email) => {
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
        `${email}_${recipeImage.imageName}`
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
