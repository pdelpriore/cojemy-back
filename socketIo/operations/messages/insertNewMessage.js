const Message = require("../../../model/Message");
const Conversation = require("../../../model/Conversation");
const User = require("../../../model/User");

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

      const messageContent = await Conversation.find({
        _id: conversation._id,
      }).populate({
        path: "author",
        select: [
          "-email",
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
      });

      resolve(messageContent);
    } catch (err) {
      if (err) console.log(err);
    }
  });
};

module.exports = { insertNewMessage };
