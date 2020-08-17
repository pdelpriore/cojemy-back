const User = require("../../../model/User");
const Event = require("../../../model/Event");
const { strings } = require("../../../strings/Strings");

const isEventJoined = (eventId, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: email });
      const event = await Event.findById(eventId);

      if (
        event.participants.some((participant) =>
          user._id.toString().includes(participant.toString())
        )
      ) {
        reject(strings.errors.joinEvent.ALREADY_JOINED);
      } else if (event.availablePlaces === event.participants.length) {
        reject(strings.errors.joinEvent.FULL);
      } else if (event.author.toString() === user._id.toString()) {
        reject(strings.errors.joinEvent.AUTHOR);
      } else {
        resolve();
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { isEventJoined };
