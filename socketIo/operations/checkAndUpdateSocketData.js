const Socket = require("../../model/Socket");

const checkAndUpdateSocketData = (data) => {
  return new Promise(async (resolve) => {
    try {
      const socketData = await Socket.findOne({ userId: data.userId });
      if (
        socketData &&
        socketData.userId.toString() === data.userId.toString() &&
        socketData.userSocketId !== data.userSocketId
      ) {
        await Socket.findOneAndUpdate(
          { userId: data.userId },
          { $set: { userSocketId: data.userSocketId } },
          { new: true }
        ).exec();
      } else if (socketData === null) {
        const newSocketData = new Socket({
          userId: data.userId,
          userSocketId: data.userSocketId,
        });
        await newSocketData.save();
      }
      resolve();
    } catch (err) {
      if (err) throw new Error(err);
    }
  });
};

module.exports = { checkAndUpdateSocketData };
