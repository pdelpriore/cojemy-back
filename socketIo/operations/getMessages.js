const User = require("../../model/User");
const Message = require("../../model/Message");
const Conversation = require("../../model/Conversation");
const Socket = require("../../model/Socket");
const { strings } = require("../../strings/Strings");
const { capitalizeFirst } = require("../../util/Util");

const getMessages = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(userId);
      const messages = await Message.find({
        _id: { $in: user.messages },
      }).populate([
        {
          path: "recipient",
          select: [
            "-password",
            "-isEmailConfirmed",
            "-isGoogleUser",
            "-isPremium",
            "-isTrialPeriod",
            "-creationDate",
            "-recipes",
            "-events",
            "-eventsJoined",
            "-followers",
            "-messages",
          ],
          model: User,
        },
        {
          path: "sender",
          select: [
            "-password",
            "-isEmailConfirmed",
            "-isGoogleUser",
            "-isPremium",
            "-isTrialPeriod",
            "-creationDate",
            "-recipes",
            "-events",
            "-eventsJoined",
            "-followers",
            "-messages",
          ],
          model: User,
        },
        {
          path: "conversations",
          model: Conversation,
        },
      ]);
      const recipientIds = messages.map((message) => message.recipient._id);
      const senderIds = messages.map((message) => message.sender._id);

      const connectedRecipients = await Socket.find({
        userId: { $in: recipientIds },
      });
      const connectedSenders = await Socket.find({
        userId: { $in: senderIds },
      });

      let result = [];

      if (connectedRecipients.length === 0 && connectedSenders.length > 0) {
        messages.forEach((message) => {
          connectedSenders.forEach((connectedSender) => {
            if (
              message.sender._id.toString() ===
              connectedSender.userId.toString()
            ) {
              result.push({
                ...message._doc,
                sender: { ...message._doc.sender, isConnected: true },
                recipient: {
                  ...message._doc.recipient,
                  isConnected: false,
                },
              });
            } else {
              result.push({
                ...message._doc,
                sender: { ...message._doc.sender, isConnected: false },
                recipient: {
                  ...message._doc.recipient,
                  isConnected: false,
                },
              });
            }
          });
        });
      }

      if (result.length > 0) {
        resolve(result);
      } else {
        reject(capitalizeFirst(strings.errors.mails.NO_MESSAGES));
      }
    } catch (err) {
      if (err) console.log(err);
    }
  });
};

module.exports = { getMessages };
