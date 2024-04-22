//----------Service----------//
import { socket } from "../../services/webSocket.Client.js";
//----------Store----------//
import useLoginStore from "../../login/store/LoginStore.js";
//----------Config----------//
const { userAuth } = useLoginStore();

const getMessages = (container) => {
  socket.on("chat message", (msg, serverOffset) => {
    const message = `<li>${msg}</li>`;
    container.value.insertAdjacentHTML("beforeend", message);
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
