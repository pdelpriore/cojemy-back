const Event = require("../../../model/Event");
const Address = require("../../../model/Address");
const moment = require("moment");
const { strings } = require("../../../strings/Strings");

const isEventReserved = (title, eventDate, addressObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const eventExists = await Event.findOne({
        title: title,
      });

      const addressReserved = await Address.findOne({
        streetNumber: addressObj.streetNumber,
        streetName: addressObj.streetName,
        city: addressObj.city,
        country: addressObj.country,
      });
      const eventReserved =
        addressReserved && (await Event.findById(addressReserved.event));

      if (eventExists) {
        reject(strings.errors.addNewEvent.EVENT_EXISTS);
      } else if (
        eventReserved &&
        moment(eventReserved.eventDate).isSame(eventDate)
      ) {
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
