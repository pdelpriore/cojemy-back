const User = require("../../../../model/User");
const Event = require("../../../../model/Event");
const Address = require("../../../../model/Address");
const { strings } = require("../../../../strings/Strings");
const { verifyToken } = require("../../../operations/token/verifyToken");

module.exports = {
  searchEvents: async ({ date, city, userId, email }, { req }) => {
    try {
      await verifyToken(
        userId,
        email,
        req.cookies.id,
        strings.tokenVerification.USER_AUTH
      );
      if (date && !city) {
        const eventsWithSearchedDate = await Event.find({ eventDate: date })
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
        if (eventsWithSearchedDate.length > 0) {
          return eventsWithSearchedDate;
        } else {
          throw new Error(strings.errors.retrieveEvents.NO_EVENTS);
        }
      } else if (!date && city) {
        let searchedCitys = await Address.find({
          city: { $regex: `.*${city}.*`, $options: "i" },
        });
        let eventIdsFromSearchedCitys = searchedCitys.map(
          (searchedCity) => searchedCity.events
        );
        let eventsWithSearchedCity = await Event.find({
          _id: { $in: eventIdsFromSearchedCitys },
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
        if (eventsWithSearchedCity.length > 0) {
          return eventsWithSearchedCity;
        } else {
          throw new Error(strings.errors.retrieveEvents.NO_EVENTS);
        }
      } else if (date && city) {
        let searchedEventCitys = await Address.find({
          city: { $regex: `.*${city}.*`, $options: "i" },
        });
        let eventIdsFromSearchedCity = searchedEventCitys.map(
          (searchedCity) => searchedCity.events
        );
        let searchedEvents = await Event.find({
          _id: { $in: eventIdsFromSearchedCity },
          eventDate: date,
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
        if (searchedEvents.length > 0) {
          return searchedEvents;
        } else {
          throw new Error(strings.errors.retrieveEvents.NO_EVENTS);
        }
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};
