const User = require("../../../model/User");
const Event = require("../../../model/Event");
const Address = require("../../../model/Address");
const { selectAddressToDelete } = require("../oldEvents/selectAddressToDelete");

const deleteOldEvents = (email) => {
  return new Promise(async (resolve) => {
    try {
      const oldEvents = await Event.find({
        eventDate: { $lt: new Date() },
      });
      const oldEventIds = oldEvents.map((event) => event._id);

      const oldEventaddressIds =
        oldEventIds.length > 0 && oldEvents.map((event) => event.eventAddress);
      const addressesWithOldEvents =
        oldEventaddressIds.length > 0 &&
        (await Address.find({
          _id: { $in: oldEventaddressIds },
        }));

      const addressesToDelete =
        oldEventIds.length > 0 &&
        addressesWithOldEvents.length > 0 &&
        (await selectAddressToDelete(oldEventIds, addressesWithOldEvents));

      if (addressesToDelete) {
        await Address.deleteMany({ _id: { $in: addressesToDelete } });
      }
      if (oldEventIds.length > 0) {
        // dodac pozniej foreach jesli istnieje image to removeImage
        await Event.deleteMany({ _id: { $in: oldEventIds } });
        await User.findOneAndUpdate(
          { email: email },
          { $pull: { events: oldEventIds } },
          { new: true }
        ).exec();
      }
      resolve();
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { deleteOldEvents };
