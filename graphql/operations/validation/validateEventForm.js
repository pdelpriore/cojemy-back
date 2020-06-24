const { strings } = require("../../../strings/Strings");
const { unacceptableWordsArray } = require("../../../shared/testWords");
const { capitalizeFirst } = require("../../../util/Util");
const moment = require("moment");

const validateEventForm = (
  title,
  eventImage,
  address,
  description,
  availablePlaces,
  eventDate
) => {
  return new Promise((resolve, reject) => {
    if (title.length > 21) {
      reject(strings.errors.validateMyRecipeForm.TITLE_LENGTH);
    } else if (
      unacceptableWordsArray.some(
        (element) =>
          title.includes(element) || title.includes(capitalizeFirst(element))
      )
    ) {
      reject(strings.errors.validateMyRecipeForm.TITLE_UNACCEPTABLE);
    } else if (
      eventImage &&
      ![".jpg", "jpeg", ".gif", ".png", ".gif"].some((element) =>
        eventImage.imageName.includes(element)
      )
    ) {
      reject(strings.errors.validateMyRecipeForm.IMAGE_FORMAT);
    } else if (
      eventImage &&
      unacceptableWordsArray.some((element) =>
        eventImage.imageName.includes(element)
      )
    ) {
      reject(strings.errors.validateMyRecipeForm.IMAGE_UNACCEPTABLE);
    } else if (
      eventImage &&
      new Buffer.from(
        eventImage.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ).byteLength > 101000
    ) {
      reject(strings.errors.validateMyRecipeForm.IMAGE_SIZE);
    } else if (!address.streetName) {
      reject(strings.errors.validateEventForm.NO_STREET);
    } else if (!address.city) {
      reject(strings.errors.validateEventForm.NO_CITY);
    } else if (
      unacceptableWordsArray.some(
        (element) =>
          description.includes(element) ||
          description.includes(capitalizeFirst(element))
      )
    ) {
      reject(strings.errors.validateMyRecipeForm.DESCRIPTION_UNACCEPTABLE);
    } else if (availablePlaces.toString().startsWith("0")) {
      reject(strings.errors.validateEventForm.AVAILABLE_PLACES_ZERO);
    } else if (availablePlaces > 500) {
      reject(strings.errors.validateEventForm.AVAILABLE_PLACES_ERROR);
    } else if (moment(new Date(eventDate)).isBefore(new Date())) {
      reject(strings.errors.validateEventForm.EVENT_DATE_ERROR);
    } else {
      resolve();
    }
  });
};

module.exports = { validateEventForm };
