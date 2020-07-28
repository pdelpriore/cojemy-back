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
      await removeUserSocketData(data.userId, null);
      socket.emit("userDisconnected", true);
    });
    socket.on("disconnect", async () => {
      await removeUserSocketData(null, socket.id);
    });
    socket.on("searchRecipient", async (data) => {
      try {
        const result = await searchRecipient(data.searchedUser);
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
