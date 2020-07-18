const User = require("../../../../model/User");
const Address = require("../../../../model/Address");
const Event = require("../../../../model/Event");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  unjoinEvent: async ({ eventId, userId, email }, { req }) => {
    try {
      await verifyToken(
        userId,
        email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      await User.findOneAndUpdate(
        { email: email },
        { $pull: { eventsJoined: eventId } },
        { new: true }
      ).exec();

      const eventUpdated = await Event.findOneAndUpdate(
        { _id: eventId },
        { $pull: { participants: userId } },
        { new: true }
      )
        .populate([
          { path: "eventAddress", model: Address },
          {
            path: "author",
            select: "-password",
            model: User,
            populate: { path: "followers", select: "-password", model: User },
          },
          { path: "participants", select: "-password", model: User },
        ])
        .exec();

      return eventUpdated;
    } catch (err) {
      if (err) throw err;
    }
  },
};
