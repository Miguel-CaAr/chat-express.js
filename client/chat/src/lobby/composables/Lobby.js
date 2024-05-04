//----------Service----------//
import { socket } from "../../services/webSocket.Client.js";
//----------Store----------//
import useLoginStore from "../../login/store/LoginStore.js";
//----------Config----------//
const { userAuth, messagesRef } = useLoginStore();

const getMessages = (container) => {
  socket.emit("get all messages");
  socket.on("chat message", (msg, serverOffset) => {
    messagesRef.push(msg);
    socket.auth.serverOffset = serverOffset;
  });
};

const setMessage = (input) => {
  if (input) socket.emit("chat message", input, parseInt(userAuth.id));
};

export default {
  getMessages,
  setMessage,
};
