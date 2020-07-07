const Event = require("../../../../model/Event");
const Address = require("../../../../model/Address");
const { strings } = require("../../../../strings/Strings");
const { verifyToken } = require("../../../operations/token/verifyToken");

module.exports = {
  clearOldEvents: async ({ userId, email }, { req }) => {
    try {
      await verifyToken(
        userId,
        email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      const oldEvents = await Event.find({
        eventDate: { $lt: new Date() },
      });
      if (oldEvents.length > 0) {
        const addressIds = oldEvents.map((event) => event.eventAddress);
        const oldEventIds = oldEvents.map((event) => event._id);

        // dodac pozniej foreach jesli istnieje image to removeImage
        await Address.deleteMany({ _id: { $in: addressIds } });
        await Event.deleteMany({ _id: { $in: oldEventIds } });
      }
      return true;
    } catch (err) {
      if (err) throw err;
    }
  },
};
