import { sendMessage, getMessages } from "../2.- Use Cases/messageUseCases.js";

export async function handleMessage(socket, db, io, num) {
  //* Logica para manejar los mensajes
  socket.on("chat message", async (msg) => {
    try {
      const newMessage = await sendMessage(db, msg);
      io.emit("chat message", newMessage.content, newMessage.id);
    } catch (error) {
      console.error(error);
    }
  });

  if (!socket.recovered) {
    try {
      const messages = await getMessages(db, num);
      messages.forEach((message) => {
        socket.emit("chat message", message.content, message.id);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
