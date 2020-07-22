const {
  checkAndUpdateSocketData,
} = require("../operatiorns/checkAndUpdateSocketData");
const { removeUserSocketData } = require("../operatiorns/removeUserSocketData");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.emit("id", socket.id);
    socket.on("userData", async (data) => {
      await checkAndUpdateSocketData(data);
    });
    socket.on("disconnected", async (data) => {
      await removeUserSocketData(data);
    });
  });
};
