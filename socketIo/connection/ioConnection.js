module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.emit("id", socket.id);
  });
};
