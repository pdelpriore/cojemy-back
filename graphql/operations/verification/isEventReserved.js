const Event = require("../../../model/Event");
const Address = require("../../../model/Address");
const { strings } = require("../../../strings/Strings");

const isEventReserved = (title, eventDate, addressObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const eventExists = await Event.findOne({
        title: title,
      });
      const eventReserved = await Event.findOne({ eventDate: eventDate });
      const addressReserved =
        eventReserved &&
        (await Address.findOne({
          event: eventReserved._id,
          streetNumber: addressObj.streetNumber,
          streetName: addressObj.streetName,
          city: addressObj.city,
          country: addressObj.country,
        }));

      if (eventExists) {
        reject(strings.errors.addNewEvent.EVENT_EXISTS);
      } else if (addressReserved) {
        reject(strings.errors.addNewEvent.EVENT_RESERVED);
      } else {
        resolve();
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { isEventReserved };
