const Socket = require("../../model/Socket");
const User = require("../../model/User");
const Message = require("../../model/Message");
const Conversation = require("../../model/Conversation");
const {
  checkAndUpdateSocketData,
} = require("../operations/checkAndUpdateSocketData");
const { removeUserSocketData } = require("../operations/removeUserSocketData");
const { searchRecipient } = require("../operations/searchRecipient");
const { hideUselessUserData } = require("../../shared/hideUselessUserData");
const { insertNewMessage } = require("../operations/insertNewMessage");
const {
  sendNewMessageEmail,
} = require("../operations/email/sendNewMessageEmail");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.emit("id", socket.id);
    socket.on("userData", async (data) => {
      try {
        await checkAndUpdateSocketData(data);
        socket.broadcast.emit("userActive", data.userId);
      } catch (err) {
        if (err) console.log(err);
      }
    });
    socket.on("disconnected", async (data) => {
      try {
        const userId = await removeUserSocketData(data.userId, null);
        if (userId) {
          socket.emit("userDisconnected", true);
          socket.broadcast.emit("userInactive", userId);
        }
      } catch (err) {
        if (err) console.log(err);
      }
    });
    socket.on("disconnect", async () => {
      try {
        const socketData = await Socket.findOne({ userSocketId: socket.id });
        if (socketData) {
          const userId = await removeUserSocketData(null, socket.id);
          if (userId) socket.broadcast.emit("userInactive", userId);
        }
      } catch (err) {
        if (err) console.log(err);
      }
    });
    socket.on("searchRecipient", async (data) => {
      try {
        const result = await searchRecipient(data.sender, data.searchedUser);
        if (result.length > 0) {
          io.to(socket.id).emit(
            "searchRecipientResult",
            hideUselessUserData(result)
          );
        }
      } catch (err) {
        if (err) io.to(socket.id).emit("searchRecipientError", err);
      }
    });
    socket.on("sendNewMessage", async (data) => {
      try {
        const messageSentId = await insertNewMessage(data);

        const messageSent = await Message.findById(messageSentId);
        const socketRecipient = await Socket.findOne({
          userId: data.recipient,
        });

        const sender = await User.findById(data.sender);
        const recipient = await User.findById(data.recipient);

        const messageContent = await Conversation.find({
          _id: { $in: messageSent.conversations },
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

        if (socketRecipient && messageContent.length > 0) {
          io.to(socketRecipient.userSocketId).emit("newMessageSent", {
            messageSent: messageContent,
          });
        } else {
          await sendNewMessageEmail(sender.name, sender.photo, recipient.email);
        }
        if (messageContent.length > 0) {
          io.to(socket.id).emit("newMessageSent", {
            messageSent: messageContent,
          });
        }
      } catch (err) {
        if (err) console.log(err);
      }
    });
  });
};
