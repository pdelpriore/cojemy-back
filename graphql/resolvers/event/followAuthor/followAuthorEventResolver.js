const User = require("../../../../model/User");
const Address = require("../../../../model/Address");
const Event = require("../../../../model/Event");
const { verifyToken } = require("../../../operations/token/verifyToken");
const { strings } = require("../../../../strings/Strings");

module.exports = {
  followAuthorEvent: async ({ authorId, eventId, userId, email }, { req }) => {
    try {
      await verifyToken(
        userId,
        email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      await User.findOneAndUpdate(
        { _id: authorId },
        { $push: { followers: userId } },
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
