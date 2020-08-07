const extractMessageData = (messages) => {
  return messages.map((message) => ({
    conversations: message.conversations,
    recipient: {
      ...message.recipient._doc,
      isConnected: message.recipient.isConnected,
    },
    sender: { ...message.sender._doc, isConnected: message.sender.isConnected },
    isRead: message.isRead,
    date: message.date,
  }));
};

module.exports = { extractMessageData };
