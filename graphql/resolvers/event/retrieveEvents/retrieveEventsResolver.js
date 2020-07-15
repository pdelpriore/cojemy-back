const User = require("../../../../model/User");
const Event = require("../../../../model/Event");
const Address = require("../../../../model/Address");
const { strings } = require("../../../../strings/Strings");
const { verifyToken } = require("../../../operations/token/verifyToken");
const {
  deleteOldEvents,
} = require("../../../operations/oldEvents/deleteOldEvents");

module.exports = {
  retrieveEvents: async ({ category, userId, email, skip, limit }, { req }) => {
    try {
      await verifyToken(
        userId,
        email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      await deleteOldEvents(email);
      const user = await User.findOne({ email: email });
      if (category === strings.retrieveEvents.CAT_MY_EVENTS) {
        const myEvents = await Event.find({ _id: { $in: user.events } })
          .sort({ creationDate: -1 })
          .populate([
            { path: "eventAddress", model: Address },
            {
              path: "author",
              select: "-password",
              model: User,
            },
            { path: "participants", select: "-password", model: User },
          ]);
        if (myEvents.length > 0) {
          return myEvents;
        } else {
          throw new Error(strings.errors.retrieveEvents.NO_EVENTS);
        }
      } else if (category === strings.retrieveEvents.CAT_ALL) {
        const allEvents = await Event.find({})
          .sort({ creationDate: -1 })
          .skip((skip - 1) * limit)
          .limit(limit)
          .populate([
            { path: "eventAddress", model: Address },
            {
              path: "author",
              select: "-password",
              model: User,
            },
            { path: "participants", select: "-password", model: User },
          ]);
        if (allEvents.length > 0) {
          return allEvents;
        } else {
          throw new Error(strings.errors.retrieveEvents.NO_EVENTS);
        }
      } else if (category === strings.retrieveEvents.CAT_EVENTS_JOINED) {
        const eventsJoined = await Event.find({
          _id: { $in: user.eventsJoined },
        })
          .sort({ creationDate: -1 })
          .populate([
            { path: "eventAddress", model: Address },
            {
              path: "author",
              select: "-password",
              model: User,
            },
            { path: "participants", select: "-password", model: User },
          ]);
        if (eventsJoined.length > 0) {
          return eventsJoined;
        } else {
          throw new Error(strings.errors.retrieveEvents.NO_EVENTS);
        }
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
