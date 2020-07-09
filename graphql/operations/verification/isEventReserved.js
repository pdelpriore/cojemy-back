const Event = require("../../../model/Event");
const Address = require("../../../model/Address");
const moment = require("moment");
const { strings } = require("../../../strings/Strings");

const isEventReserved = (eventDate, addressObj, addressId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const reservedAddress = await Address.findOne({
        streetNumber: addressObj.streetNumber,
        streetName: addressObj.streetName,
        city: addressObj.city,
        country: addressObj.country,
      });

      if (reservedAddress) {
        if (
          addressId === null ||
          addressId.toString() !== reservedAddress._id.toString()
        ) {
          const reservedEvents = await Event.find({
            _id: { $in: reservedAddress.events },
          });

          if (reservedEvents) {
            reservedEvents.forEach((reservedEvent) => {
              if (
                moment(
                  new Date(reservedEvent.eventDate).setHours(0, 0, 0, 0)
                ).isSame(new Date(eventDate).setHours(0, 0, 0, 0))
              ) {
                reject(strings.errors.addNewEvent.EVENT_RESERVED);
              } else {
                resolve();
              }
            });
          } else {
            resolve();
          }
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { isEventReserved };
