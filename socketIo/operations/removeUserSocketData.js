const Socket = require("../../model/Socket");

const removeUserSocketData = (userId, userSocketId) => {
  return new Promise(async (resolve) => {
    if (userId) {
      await Socket.findOneAndRemove({
        userId: userId,
      });
      resolve(userId);
    } else if (userSocketId) {
      const socket = await Socket.findOne({ userSocketId: userSocketId });
      await Socket.findOneAndRemove({
        userSocketId: userSocketId,
      });
      resolve(socket.userId);
    }
  });
};

module.exports = { removeUserSocketData };
