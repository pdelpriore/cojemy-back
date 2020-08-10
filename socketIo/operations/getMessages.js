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
          populate: {
            path: "author",
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

      if (messages.length > 0) {
        if (connectedRecipients.length === 0 && connectedSenders.length > 0) {
          messages.forEach((message) => {
            connectedSenders.forEach((connectedSender) => {
              if (
                message.sender._id.toString() ===
                connectedSender.userId.toString()
              ) {
                result.push({
                  ...message,
                  sender: { ...message.sender, isConnected: true },
                  recipient: {
                    ...message.recipient,
                    isConnected: false,
                  },
                });
              } else {
                result.push({
                  ...message,
                  sender: { ...message.sender, isConnected: false },
                  recipient: {
                    ...message.recipient,
                    isConnected: false,
                  },
                });
              }
            });
          });
        } else if (
          connectedRecipients.length > 0 &&
          connectedSenders.length === 0
        ) {
          messages.forEach((message) => {
            connectedRecipients.forEach((connectedRecipient) => {
              if (
                message.recipient._id.toString() ===
                connectedRecipient.userId.toString()
              ) {
                result.push({
                  ...message,
                  sender: { ...message.sender, isConnected: false },
                  recipient: {
                    ...message.recipient,
                    isConnected: true,
                  },
                });
              } else {
                result.push({
                  ...message,
                  sender: { ...message.sender, isConnected: false },
                  recipient: {
                    ...message.recipient,
                    isConnected: false,
                  },
                });
              }
            });
          });
        } else if (
          connectedRecipients.length > 0 &&
          connectedSenders.length > 0
        ) {
          messages.forEach((message) => {
            connectedRecipients.forEach((connectedRecipient) => {
              connectedSenders.forEach((connectedSender) => {
                if (
                  message.recipient._id.toString() ===
                    connectedRecipient.userId.toString() &&
                  message.sender._id.toString() ==
                    connectedSender.userId.toString()
                ) {
                  result.push({
                    ...message,
                    sender: { ...message.sender, isConnected: true },
                    recipient: {
                      ...message.recipient,
                      isConnected: true,
                    },
                  });
                } else if (
                  message.recipient._id.toString() ===
                    connectedRecipient.userId.toString() &&
                  message.sender._id.toString() !==
                    connectedSender.userId.toString()
                ) {
                  result.push({
                    ...message,
                    sender: { ...message.sender, isConnected: false },
                    recipient: {
                      ...message.recipient,
                      isConnected: true,
                    },
                  });
                } else if (
                  message.recipient._id.toString() !==
                    connectedRecipient.userId.toString() &&
                  message.sender._id.toString() ===
                    connectedSender.userId.toString()
                ) {
                  result.push({
                    ...message,
                    sender: { ...message.sender, isConnected: true },
                    recipient: {
                      ...message.recipient,
                      isConnected: false,
                    },
                  });
                } else if (
                  message.recipient._id.toString() !==
                    connectedRecipient.userId.toString() &&
                  message.sender._id.toString() !==
                    connectedSender.userId.toString()
                ) {
                  result.push({
                    ...message,
                    sender: { ...message.sender, isConnected: false },
                    recipient: {
                      ...message.recipient,
                      isConnected: false,
                    },
                  });
                }
              });
            });
          });
        }
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
