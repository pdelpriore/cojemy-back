const User = require("../../../model/User");
const Event = require("../../../model/Event");
const Address = require("../../../model/Address");

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
        let addressesWithNoEvents = [];
        addressesWithOldEventPulled.forEach((address) => {
          if (address.events.length === 0)
            addressesWithNoEvents.push(address._id);
        });
        if (addressesWithNoEvents.length > 0) {
          await Address.deleteMany({ _id: { $in: addressesWithNoEvents } });
        }
      }

      if (oldEventIds.length > 0) {
        // dodac pozniej foreach jesli istnieje image to removeImage
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
