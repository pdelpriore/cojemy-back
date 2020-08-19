const Message = require("../../model/Message");

const setMessageRead = (messageId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Message.findOneAndUpdate(
        { _id: messageId },
        { $set: { isRecipientRead: true } },
        { new: true }
      ).exec();
      resolve();
    } catch (err) {
      if (err) console.log(err);
    }
  });
};

module.exports = { setMessageRead };
