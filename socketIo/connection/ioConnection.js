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
      await checkAndUpdateSocketData(data);
    });
    socket.on("disconnected", async (data) => {
      const userId = await removeUserSocketData(data.userId, null);
      if (userId) {
        socket.emit("userDisconnected", true);
        socket.broadcast.emit("userInactive", userId);
      }
    });
    socket.on("disconnect", async () => {
      const userId = await removeUserSocketData(null, socket.id);
      if (userId) socket.broadcast.emit("userInactive", userId);
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
  });
};
