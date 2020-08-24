const Socket = require("../../model/Socket");
const User = require("../../model/User");
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
const { getMessages } = require("../operations/getMessages");
const {
  insertNewConversation,
} = require("../operations/insertNewConversation");
const { setMessageRead } = require("../operations/setMessageRead");
const { setMessageUnread } = require("../operations/setMessageUnread");
const { setUserActive } = require("../operations/setUserActive");
const { setUserInactive } = require("../operations/setUserInactive");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.emit("id", socket.id);
    socket.on("userData", async (data) => {
      try {
        await checkAndUpdateSocketData(data);
        await setUserActive(data.userId);
        socket.broadcast.emit("userActive", data.userId);
        socket.broadcast.emit("userActiveListInfo", true);
      } catch (err) {
        if (err) console.log(err);
      }
    });
    socket.on("disconnected", async (data) => {
      try {
        const userId = await removeUserSocketData(data.userId, null);
        if (userId) {
          await setUserInactive(userId);
          socket.emit("userDisconnected", true);
          socket.broadcast.emit("userInactive", userId);
          socket.broadcast.emit("userActiveListInfo", false);
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
          if (userId) {
            await setUserInactive(userId);
            socket.broadcast.emit("userInactive", userId);
            socket.broadcast.emit("userActiveListInfo", false);
          }
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
    socket.on("getMessages", async (userId) => {
      try {
        const messages = await getMessages(userId);
        if (messages.length > 0) {
          io.to(socket.id).emit("messagesRetrieved", messages);
          io.to(socket.id).emit("messagesRetrievedApp", messages);
        }
      } catch (err) {
        if (err) io.to(socket.id).emit("getMessagesError", err);
        if (err) io.to(socket.id).emit("getMessagesErrorApp", err);
      }
    });
    socket.on("sendNewMessage", async (data) => {
      try {
        const messageContent = await insertNewMessage(data);

        const socketRecipient = await Socket.findOne({
          userId: data.recipient,
        });

        const sender = await User.findById(data.sender);
        const recipient = await User.findById(data.recipient);

        if (socketRecipient && messageContent.length > 0) {
          io.to(socketRecipient.userSocketId).emit("newMessageSent", {
            messageSent: messageContent,
          });
          io.to(socketRecipient.userSocketId).emit(
            "newMessageSentListInfo",
            true
          );
          io.to(socketRecipient.userSocketId).emit(
            "newMessageSentAppInfo",
            true
          );
        } else {
          await sendNewMessageEmail(sender.name, sender.photo, recipient.email);
        }
        if (messageContent.length > 0) {
          io.to(socket.id).emit("newMessageSent", {
            messageSent: messageContent,
          });
          io.to(socket.id).emit("newMessageSentListInfo", true);
          io.to(socket.id).emit("newMessageSentAppInfo", true);
        }
      } catch (err) {
        if (err) console.log(err);
      }
    });
    socket.on("sendNewConversation", async (data) => {
      try {
        const newConversationContent = await insertNewConversation(data);

        const socketRecipient = await Socket.findOne({
          userId: data.recipient,
        });

        const sender = await User.findById(data.sender);
        const recipient = await User.findById(data.recipient);

        if (socketRecipient && newConversationContent.length > 0) {
          io.to(socketRecipient.userSocketId).emit("newConversationSent", {
            newConversationContent: newConversationContent,
          });
          io.to(socketRecipient.userSocketId).emit(
            "newConversationListInfo",
            newConversationContent[0].message
          );
          io.to(socketRecipient.userSocketId).emit(
            "newConversationAppInfo",
            newConversationContent[0].message
          );
        } else {
          await sendNewMessageEmail(sender.name, sender.photo, recipient.email);
        }
        if (newConversationContent.length > 0) {
          io.to(socket.id).emit("newConversationSent", {
            newConversationContent: newConversationContent,
          });
          io.to(socket.id).emit(
            "newConversationListInfo",
            newConversationContent[0].message
          );
          io.to(socket.id).emit(
            "newConversationAppInfo",
            newConversationContent[0].message
          );
        }
      } catch (err) {
        if (err) console.log(err);
      }
    });
    socket.on("messageRead", async (messageId) => {
      try {
        await setMessageRead(messageId);
        io.to(socket.id).emit("messageReadSetListInfo", true);
      } catch (err) {
        if (err) console.log(err);
      }
    });
    socket.on("messageUnread", async (messageId) => {
      try {
        await setMessageUnread(messageId);
        io.to(socket.id).emit("messageUnreadSetListInfo", true);
        io.to(socket.id).emit("messageUnreadSetAppInfo", true);
      } catch (err) {
        if (err) console.log(err);
      }
    });
  });
};
