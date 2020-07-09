const Event = require("../../../model/Event");
const { removeImage } = require("./removeImage");
const { uploadImage } = require("./uploadImage");
const { strings } = require("../../../strings/Strings");

const checkEventImage = (eventId, eventImage) => {
  return new Promise(async (resolve) => {
    try {
      const event = await Event.findById(eventId);
      const eventImageName =
        event.eventImage && event.eventImage.split("/").slice(3).toString();
      if (eventImage) {
        if (eventImageName === eventImage.imageName) {
          resolve(event.eventImage);
        } else {
          if (eventImageName) {
            removeImage(eventImageName, strings.imageTypes.EVENT);
          }
          const newPath = await uploadImage(
            eventImage,
            strings.imageTypes.EVENT
          );
          resolve(newPath);
        }
      } else {
        if (eventImageName) {
          removeImage(eventImageName, strings.imageTypes.EVENT);
        }
        resolve(null);
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { checkEventImage };
