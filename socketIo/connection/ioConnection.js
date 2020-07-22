const {
  checkAndUpdateSocketData,
} = require("../operations/checkAndUpdateSocketData");
const { removeUserSocketData } = require("../operations/removeUserSocketData");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.emit("id", socket.id);
    socket.on("userData", async (data) => {
      await checkAndUpdateSocketData(data);
    });
    socket.on("disconnected", async (data) => {
      await removeUserSocketData(data);
      socket.emit("userDisconnected", true);
    });
  });
};
