const User = require("../../../model/User");
const Event = require("../../../model/Event");
const Address = require("../../../model/Address");
const { removeImage } = require("../image/removeImage");
const { strings } = require("../../../strings/Strings");

const deleteOldEvents = (email) => {
  return new Promise(async (resolve) => {
    try {
      const oldEvents = await Event.find({
        eventDate: { $lt: new Date() },
      });
      const oldEventIds =
        oldEvents.length > 0 && oldEvents.map((event) => event._id);

      const oldEventaddressIds =
        oldEvents.length > 0 && oldEvents.map((event) => event.eventAddress);

      if (oldEventaddressIds.length > 0) {
        await Address.updateMany(
          {
            _id: { $in: oldEventaddressIds },
          },
          { $pull: { events: { $in: oldEventIds } } }
        );

        const addressesWithOldEventPulled = await Address.find({
          _id: { $in: oldEventaddressIds },
        });

        const addressesWithNoEvents = addressesWithOldEventPulled
          .filter(
            (addressOldEventPulled) => addressOldEventPulled.events.length === 0
          )
          .map((addressNoEvents) => addressNoEvents._id);
        if (addressesWithNoEvents.length > 0) {
          await Address.deleteMany({ _id: { $in: addressesWithNoEvents } });
        }
      }

      if (oldEventIds.length > 0) {
        const oldEventsWithPicture = oldEvents.filter(
          (oldEvent) =>
            oldEvent.eventImage !== null && oldEvent.eventImage !== undefined
        );
        oldEventsWithPicture.length > 0 &&
          oldEventsWithPicture.forEach((event) => {
            removeImage(
              event.eventImage.split("/").slice(3).toString(),
              strings.imageTypes.EVENT
            );
          });

        await User.findOneAndUpdate(
          { email: email },
          { $pull: { events: { $in: oldEventIds } } },
          { new: true }
        ).exec();
        await Event.deleteMany({ _id: { $in: oldEventIds } });
      }
      resolve();
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { deleteOldEvents };
