const {
  checkAndUpdateSocketData,
} = require("../operatiorns/checkAndUpdateSocketData");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.emit("id", socket.id);
    socket.on("userData", async (data) => {
      await checkAndUpdateSocketData(data);
    });
  });
};
