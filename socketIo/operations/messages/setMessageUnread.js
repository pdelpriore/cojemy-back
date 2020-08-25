const Message = require("../../../model/Message");

const setMessageUnread = (messageId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Message.findOneAndUpdate(
        { _id: messageId },
        { $set: { isRead: false } },
        { new: true }
      ).exec();
      resolve();
    } catch (err) {
      if (err) console.log(err);
    }
  });
};

module.exports = { setMessageUnread };
