const Socket = require("../../model/Socket");

const checkAndUpdateSocketData = (data) => {
  return new Promise(async (resolve) => {
    const socket = await Socket.findOne({ userId: data.userId });
    if (
      socket &&
      socket.userId.toString() === data.userId.toString() &&
      socket.userSocketId !== data.userSocketId
    ) {
      await Socket.findOneAndUpdate(
        { userId: data.userId },
        { $set: { userSocketId: data.userSocketId } },
        { new: true }
      ).exec();
    } else if (socket === null) {
      const newSocket = new Socket({
        userId: data.userId,
        userSocketId: data.userSocketId,
      });
      await newSocket.save();
    }
    resolve();
  });
};

module.exports = { checkAndUpdateSocketData };
