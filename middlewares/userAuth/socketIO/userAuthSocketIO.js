const { verifyToken } = require("../../../shared/verifyToken");
const cookie = require("cookie");
const { strings } = require("../../../strings/Strings");

const userAuthSocketIO = async (socket, next) => {
  try {
    await verifyToken(
      socket.handshake.query.userId,
      socket.handshake.query.userEmail,
      cookie.parse(socket.handshake.headers.cookie).id,
      strings.tokenVerification.USER_AUTH
    );
    next();
  } catch (err) {
    if (err) console.log(err);
  }
};

module.exports = { userAuthSocketIO };
