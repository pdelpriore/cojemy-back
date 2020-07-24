const User = require("../../../../model/User");
const Address = require("../../../../model/Address");
const Event = require("../../../../model/Event");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  unjoinEvent: async ({ eventId, userId, email }) => {
    try {
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
