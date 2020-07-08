const selectAddressToDelete = (oldEventIds, addressesWithOldEvents) => {
  return new Promise((resolve) => {
    let oldEventIdsQuoted = oldEventIds
      .map((i) => i)
      .toString()
      .split(",");
    let addressesToDelete = [];
    addressesWithOldEvents.forEach((address) => {
      let addressesQuoted = address.events
        .map((i) => i)
        .toString()
        .split(",");
      if (
        addressesQuoted.every((val, index) => val === oldEventIdsQuoted[index])
      )
        addressesToDelete.push(address._id);
    });
    if (addressesToDelete.length > 0) {
      resolve(addressesToDelete);
    } else {
      resolve(null);
    }
  });
};

module.exports = { selectAddressToDelete };
