const Message = require("../../model/Message");
const Conversation = require("../../model/Conversation");
const User = require("../../model/User");

const insertNewConversation = (data) => {
  return new Promise(async (resolve) => {
    try {
      const author = await User.findById(data.sender);

      const newConversation = new Conversation({
        author: author,
        content: data.content,
        date: new Date(),
      });
      await newConversation.save();

      const messageUpdated = await Message.findOneAndUpdate(
        { _id: data.messageId },
        { $push: { conversations: newConversation } },
        { new: true }
      ).exec();

      const newConversationContent = await Conversation.find({
        _id: { $in: messageUpdated.conversations },
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
      resolve(newConversationContent);
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { insertNewConversation };
