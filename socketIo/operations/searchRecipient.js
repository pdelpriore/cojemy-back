const User = require("../../model/User");
const Socket = require("../../model/Socket");
const { strings } = require("../../strings/Strings");
const { capitalizeFirst } = require("../../util/Util");

const searchRecipient = (senderId, searchedUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const recipients = await User.find({
        name: { $regex: `.*${searchedUser}.*`, $options: "i" },
      }).limit(5);
      if (recipients.length > 0) {
        const recipientsWithoutSender = recipients.filter(
          (recipient) => recipient._id.toString() !== senderId
        );
        const recipientIds = recipientsWithoutSender.map(
          (element) => element._id
        );
        const connected = await Socket.find({ userId: { $in: recipientIds } });
        if (connected.length > 0) {
          let result = [];
          recipientsWithoutSender.forEach((recipient) => {
            connected.forEach((connectedUser) => {
              if (
                recipient._id.toString() === connectedUser.userId.toString()
              ) {
                result.push({ ...recipient, isConnected: true });
              } else {
                result.push({ ...recipient, isConnected: false });
              }
            });
          });
          resolve(result);
        } else {
          let result = [];
          recipientsWithoutSender.forEach((recipient) => {
            result.push({ ...recipient, isConnected: false });
          });
          resolve(result);
        }
      } else {
        reject(capitalizeFirst(strings.errors.mails.NO_RECIPIENT));
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { searchRecipient };
