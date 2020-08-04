const Message = require("../../model/Message");
const Conversation = require("../../model/Conversation");
const User = require("../../model/User");

const insertNewMessage = (data) => {
  return new Promise(async (resolve) => {
    try {
      const author = await User.findById(data.sender);
      const conversation = new Conversation({
        author: author,
        content: data.content,
        date: new Date(),
      });
      await conversation.save();

      const message = new Message({
        recipient: data.recipient,
        sender: data.sender,
        isRead: false,
        date: new Date(),
        conversations: [conversation],
      });
      await message.save();

      await Conversation.findOneAndUpdate(
        { _id: conversation._id },
        { $set: { message: message } },
        { new: true }
      ).exec();

      await User.findOneAndUpdate(
        { _id: data.sender },
        { $push: { messages: message } },
        { new: true }
      ).exec();
      await User.findOneAndUpdate(
        { _id: data.recipient },
        { $push: { messages: message } },
        { new: true }
      ).exec();

      resolve(message._id);
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { insertNewMessage };
