const User = require("../../../../model/User");
const Address = require("../../../../model/Address");
const Event = require("../../../../model/Event");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  unfollowAuthorEvent: async ({ authorId, eventId, userId }) => {
    try {
      await User.findOneAndUpdate(
        { _id: authorId },
        { $pull: { followers: userId } },
        { new: true }
      ).exec();

      const event = await Event.findById(eventId).populate([
        { path: "eventAddress", model: Address },
        {
          path: "author",
          select: "-password",
          model: User,
          populate: { path: "followers", select: "-password", model: User },
        },
        { path: "participants", select: "-password", model: User },
      ]);

      return event;
    } catch (err) {
      if (err) throw err;
    }
  },
};
