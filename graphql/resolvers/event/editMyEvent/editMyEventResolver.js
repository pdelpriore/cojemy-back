const Event = require("../../../../model/Event");
const Address = require("../../../../model/Address");
const { verifyToken } = require("../../../operations/token/verifyToken");
const {
  validateEventForm,
} = require("../../../operations/validation/validateEventForm");
const {
  isEventReserved,
} = require("../../../operations/verification/isEventReserved");
const { strings } = require("../../../../strings/Strings");
const {
  checkEventImage,
} = require("../../../operations/image/checkEventImage");

module.exports = {
  editEvent: async (
    {
      title,
      eventImage,
      addressObj,
      description,
      availablePlaces,
      eventDate,
      tel,
      eventId,
      addressId,
      userId,
      email,
    },
    { req }
  ) => {
    try {
      await verifyToken(
        userId,
        email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      await validateEventForm(
        title,
        eventImage,
        addressObj,
        description,
        availablePlaces,
        eventDate,
        tel
      );
      await isEventReserved(eventDate, addressObj, addressId);
      const imagePath = await checkEventImage(eventId, eventImage);

      await Address.findOneAndUpdate(
        { _id: addressId },
        {
          $set: {
            label: addressObj.label,
            streetNumber: addressObj.streetNumber,
            streetName: addressObj.streetName,
            postCode: addressObj.postCode,
            city: addressObj.city,
            country: addressObj.country,
            latitude: addressObj.latitude,
            longitude: addressObj.longitude,
            zoom: addressObj.zoom,
          },
        },
        { new: true }
      ).exec();

      await Event.findOneAndUpdate(
        { _id: eventId },
        {
          $set: {
            title: title,
            eventImage: imagePath,
            description: description,
            availablePlaces: availablePlaces,
            eventDate: eventDate,
            tel: tel,
          },
        },
        { new: true }
      ).exec();

      return true;
    } catch (err) {
      if (err) throw err;
    }
  },
};
