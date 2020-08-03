const Socket = require("../../model/Socket");
const {
  checkAndUpdateSocketData,
} = require("../operations/checkAndUpdateSocketData");
const { removeUserSocketData } = require("../operations/removeUserSocketData");
const { searchRecipient } = require("../operations/searchRecipient");
const { hideUselessUserData } = require("../../shared/hideUselessUserData");

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
    socket.on("sendNewMessage", (data) => {
      console.log(data);
      io.to(socket.id).emit("newMessageSent", true);
    });
  });
};
