const Event = require("../../../../model/Event");
const Address = require("../../../../model/Address");
const User = require("../../../../model/User");
const {
  validateEventForm,
} = require("../../../operations/validation/validateEventForm");
const {
  isEventReserved,
} = require("../../../operations/verification/isEventReserved");
const { strings } = require("../../../../strings/Strings");
const { uploadImage } = require("../../../operations/image/uploadImage");
const {
  sendFollowEventEmail,
} = require("../../../operations/email/sendFollowEventEmail");

module.exports = {
  addMyEvent: async ({
    title,
    eventImage,
    addressObj,
    description,
    availablePlaces,
    eventDate,
    tel,
    email,
    date,
  }) => {
    try {
      await validateEventForm(
        title,
        eventImage,
        addressObj,
        description,
        availablePlaces,
        eventDate,
        tel
      );
      await isEventReserved(eventDate, addressObj, null);
      const imagePath =
        eventImage && (await uploadImage(eventImage, strings.imageTypes.EVENT));

      const user = await User.findOne({ email: email });

      const usedAddress = await Address.findOne({
        streetNumber: addressObj.streetNumber,
        streetName: addressObj.streetName,
        city: addressObj.city,
        country: addressObj.country,
      });

      if (usedAddress) {
        const event = new Event({
          title: title,
          eventImage: imagePath,
          eventAddress: usedAddress,
          description: description,
          availablePlaces: availablePlaces,
          author: user,
          eventDate: eventDate,
          tel: tel,
          creationDate: date,
        });
        await event.save();

        await Address.findOneAndUpdate(
          { _id: usedAddress._id },
          { $push: { events: event } },
          { new: true }
        ).exec();

        await User.findOneAndUpdate(
          { email: email },
          { $push: { events: event } },
          { new: true }
        ).exec();

        if (user.followers.length > 0) {
          const followers = await User.find({
            _id: { $in: user.followers },
          });
          const followersEmailList = followers.map(
            (follower) => follower.email
          );
          await sendFollowEventEmail(
            user.name,
            title,
            addressObj.city,
            followersEmailList,
            user.photo,
            imagePath
          );
        }

        return true;
      } else {
        const address = new Address({
          label: addressObj.label,
          streetNumber: addressObj.streetNumber,
          streetName: addressObj.streetName,
          postCode: addressObj.postCode,
          city: addressObj.city,
          country: addressObj.country,
          latitude: addressObj.latitude,
          longitude: addressObj.longitude,
          zoom: addressObj.zoom,
        });
        await address.save();

        const event = new Event({
          title: title,
          eventImage: imagePath,
          eventAddress: address,
          description: description,
          availablePlaces: availablePlaces,
          author: user,
          eventDate: eventDate,
          tel: tel,
          creationDate: date,
        });
        await event.save();

        await Address.findOneAndUpdate(
          { _id: address },
          { $push: { events: event } },
          { new: true }
        ).exec();

        await User.findOneAndUpdate(
          { email: email },
          { $push: { events: event } },
          { new: true }
        ).exec();

        if (user.followers.length > 0) {
          const followers = await User.find({
            _id: { $in: user.followers },
          });
          const followersEmailList = followers.map(
            (follower) => follower.email
          );
          await sendFollowEventEmail(
            user.name,
            title,
            addressObj.city,
            followersEmailList,
            user.photo,
            imagePath
          );
        }

        return true;
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
