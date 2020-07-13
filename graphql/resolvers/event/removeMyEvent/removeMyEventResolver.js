const User = require("../../../../model/User");
const Address = require("../../../../model/Address");
const Event = require("../../../../model/Event");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { strings } = require("../../../../strings/Strings");
const { removeImage } = require("../../../operations/image/removeImage");

module.exports = {
  removeEvent: async ({ eventId, addressId, userId, email }, { req }) => {
    try {
      await verifyToken(
        userId,
        email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      const addressWithEventPulled = await Address.findOneAndUpdate(
        { _id: addressId },
        { $pull: { events: eventId } },
        { new: true }
      ).exec();

      if (addressWithEventPulled.events.length === 0) {
        await Address.findOneAndRemove({ _id: addressWithEventPulled._id });
      }

      const event = await Event.findById(eventId);
      if (event.eventImage) {
        removeImage(
          event.eventImage.split("/").slice(3).toString(),
          strings.imageTypes.EVENT
        );
      }
      await User.findOneAndUpdate(
        { email: email },
        { $pull: { events: eventId } },
        { new: true }
      ).exec();

      await Event.findOneAndRemove({ _id: eventId });

      return true;
    } catch (err) {
      if (err) throw err;
    }
  },
};
