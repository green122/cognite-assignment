let messages = {};

export function getChatMessages({ from, to }) {
  const fromMessages = (messages[from] || []).filter(
    message => message.to === to
  );
  const toMessages = (messages[to] || []).filter(
    message => message.to === from
  );
  const chatMessages = fromMessages
    .concat(toMessages)
    .sort((a, b) => a.timestamp - b.timestamp);
  return Promise.resolve(chatMessages);
}

export function sendMessage({ from, message }) {
  messages[from] = (messages[from] || []).concat(message);
  localStorage.setItem("chat", JSON.stringify(messages));
  return Promise.resolve();
}

export function connectToStore() {
  const messagesStored = localStorage.getItem("chat");
  if (messagesStored) {
    try {
      messages = JSON.parse(messagesStored);
    } catch (error) {
      messages = {};
      console.log(error);
    }
  }
}
