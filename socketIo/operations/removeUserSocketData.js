const Socket = require("../../model/Socket");

const removeUserSocketData = (userId, userSocketId) => {
  return new Promise(async (resolve) => {
    if (userId) {
      await Socket.findOneAndRemove({
        userId: userId,
      });
      resolve();
    } else if (userSocketId) {
      await Socket.findOneAndRemove({
        userSocketId: userSocketId,
      });
      resolve();
    }
  });
};

module.exports = { removeUserSocketData };
