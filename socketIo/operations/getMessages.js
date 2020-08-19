const User = require("../../model/User");
const Message = require("../../model/Message");
const Conversation = require("../../model/Conversation");
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

      if (messages.length > 0) {
        resolve(messages);
      } else {
        reject(capitalizeFirst(strings.errors.mails.NO_MESSAGES));
      }
    } catch (err) {
      if (err) console.log(err);
    }
  });
};

module.exports = { getMessages };
