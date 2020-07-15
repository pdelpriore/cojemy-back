const User = require("../../../../model/User");
const Address = require("../../../../model/Address");
const Event = require("../../../../model/Event");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  joinEvent: async ({ eventId, userId, email }, { req }) => {
    try {
      await verifyToken(
        userId,
        email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      const userUpdated = await User.findOneAndUpdate(
        { email: email },
        { $push: { eventsJoined: eventId } },
        { new: true }
      ).exec();
      await Event.findOneAndUpdate(
        { _id: eventId },
        { $push: { participants: userUpdated } },
        { new: true }
      ).exec();
      const eventUpdated = Event.findById(eventId).populate([
        { path: "eventAddress", model: Address },
        {
          path: "author",
          select: "-password",
          model: User,
        },
        { path: "participants", select: "-password", model: User },
      ]);
      return eventUpdated;
    } catch (err) {
      if (err) throw err;
    }
  },
};
