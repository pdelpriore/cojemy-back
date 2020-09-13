const Message = require("../model/Message");
const Conversation = require("../model/Conversation");
const User = require("../model/User");

const removeOldMessages = () => {
  return new Promise(async (resolve) => {
    try {
      const oldMessages = await Message.find({
        date: { $lte: new Date().getTime() - 1000 * 3600 * 24 * 3 },
      });
      if (oldMessages.length > 0) {
        const oldMessageIds = oldMessages.map((message) => message._id);
        const recipientIds = oldMessages.map((message) => message.recipient);
        const senderIds = oldMessages.map((message) => message.sender);
        oldMessages.forEach(async (oldMessage) => {
          let oldConversationIds = oldMessage.conversations.map(
            (conversation) => conversation
          );
          await Conversation.deleteMany({ _id: { $in: oldConversationIds } });
        });
        await User.updateMany(
          { _id: { $in: recipientIds } },
          { $pull: { messages: { $in: oldMessageIds } } }
        );
        await User.updateMany(
          { _id: { $in: senderIds } },
          { $pull: { messages: { $in: oldMessageIds } } }
        );

        await Message.deleteMany({ _id: { $in: oldMessageIds } });
        resolve();
      } else {
        resolve();
      }
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { removeOldMessages };
