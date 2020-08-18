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
          (recipient) => recipient._id.toString() !== senderId.toString()
        );
        const recipientIds = recipientsWithoutSender.map(
          (element) => element._id
        );
        const connected = await Socket.find({ userId: { $in: recipientIds } });
        if (connected.length > 0) {
          let result = [];
          recipientsWithoutSender.sort();
          connected.sort((a, b) => (a.userId > b.userId ? 1 : -1));
          recipientsWithoutSender.every((recipient, index) =>
            recipient._id.toString() === connected[index].userId.toString()
              ? result.push({ ...recipient, isConnected: true })
              : result.push({ ...recipient, isConnected: false })
          );
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
      if (err) console.log(err);
    }
  });
};

module.exports = { searchRecipient };
