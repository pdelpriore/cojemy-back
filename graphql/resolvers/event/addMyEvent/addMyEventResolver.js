const Event = require("../../../../model/Event");
const Address = require("../../../../model/Address");
const User = require("../../../../model/User");
const { verifyToken } = require("../../../operations/token/verifyToken");
const {
  validateEventForm,
} = require("../../../operations/validation/validateEventForm");
const { strings } = require("../../../../strings/Strings");
const { uploadImage } = require("../../../operations/image/uploadImage");

module.exports = {
  addMyEvent: async (
    {
      title,
      eventImage,
      addressObj,
      description,
      availablePlaces,
      eventDate,
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
      const eventExists = await Event.findOne({
        title: title,
      });
      if (eventExists === null) {
        await validateEventForm(
          title,
          eventImage,
          addressObj,
          description,
          availablePlaces,
          eventDate
        );
        const imagePath =
          eventImage &&
          (await uploadImage(eventImage, strings.imageTypes.EVENT));

        const user = await User.findOne({ email: email });

        let address = new Address({
          streetNumber: addressObj.streetNumber,
          streetName: addressObj.streetName,
          postCode: addressObj.postCode,
          city: addressObj.city,
          latitude: addressObj.latitude,
          longitude: addressObj.longitude,
          zoom: addressObj.zoom,
        });
        await address.save();

        let event = new Event({
          title: title,
          eventImage: imagePath,
          eventAddress: address,
          description: description,
          availablePlaces: availablePlaces,
          author: user,
          eventDate: eventDate,
          creationDate: new Date(),
        });
        await event.save();

        await Address.findOneAndUpdate(
          { _id: address },
          { $set: { event: event } },
          { new: true }
        ).exec();

        await User.findOneAndUpdate(
          { email: email },
          { $push: { events: event } },
          { new: true }
        ).exec();

        return true;
      } else {
        throw new Error(strings.errors.addNewEvent.EVENT_EXISTS);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
