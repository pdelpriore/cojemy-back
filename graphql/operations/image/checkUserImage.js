const User = require("../../../model/User");
const { removeImage } = require("./removeImage");
const { uploadImage } = require("./uploadImage");
const { strings } = require("../../../strings/Strings");

const checkUserImage = async (email, profileImage) => {
  const imagePath = await new Promise(async (resolve, reject) => {
    const user = await User.findOne({ email: email });
    const userImageName =
      user.photo && user.photo.split("/").slice(3).toString();
    if (profileImage) {
      if (profileImage.imageName) {
        if (userImageName === profileImage.imageName) {
          resolve(user.photo);
        } else {
          if (
            userImageName &&
            !["googleusercontent.com"].some(
              (element) => user.photo && user.photo.includes(element)
            )
          ) {
            removeImage(userImageName, strings.imageTypes.USER);
          }
          const newPath = await uploadImage(
            profileImage,
            strings.imageTypes.USER
          );
          resolve(newPath);
        }
      } else if (!profileImage.imageName) {
        if (user.photo === profileImage.image) {
          resolve(user.photo);
        }
      }
    } else {
      if (
        userImageName &&
        !["googleusercontent.com"].some(
          (element) => user.photo && user.photo.includes(element)
        )
      ) {
        removeImage(userImageName, strings.imageTypes.USER);
      }
      resolve(null);
    }
  });
  return imagePath;
};

module.exports = { checkUserImage };
