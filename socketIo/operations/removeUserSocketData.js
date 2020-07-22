const Socket = require("../../model/Socket");

const removeUserSocketData = (data) => {
  return new Promise(async (resolve) => {
    await Socket.findOneAndRemove({
      userId: data.userId,
    });
    resolve();
  });
};

module.exports = { removeUserSocketData };
