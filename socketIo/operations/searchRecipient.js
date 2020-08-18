const User = require("../../model/User");
const Socket = require("../../model/Socket");
const { strings } = require("../../strings/Strings");
const { capitalizeFirst } = require("../../util/Util");

const searchRecipient = (senderId, searchedUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const recipients = await User.find({
        name: { $regex: `.*${searchedUser}.*`, $options: "i" },
      })
        .limit(5)
        .sort({ _id: 1 });
      if (recipients.length > 0) {
        const recipientsWithoutSender = recipients.filter(
          (recipient) => recipient._id.toString() !== senderId.toString()
        );
        const recipientIds = recipientsWithoutSender.map(
          (element) => element._id
        );
        const connected = await Socket.find({
          userId: { $in: recipientIds },
        }).sort({ userId: 1 });

        if (connected.length > 0) {
          resolve(
            recipientsWithoutSender.map((recipient, index) =>
              connected[index] &&
              recipient._id.toString() === connected[index].userId.toString()
                ? { ...recipient, isConnected: true }
                : { ...recipient, isConnected: false }
            )
          );
        } else {
          resolve(
            recipientsWithoutSender.map((recipient) => ({
              ...recipient,
              isConnected: false,
            }))
          );
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
