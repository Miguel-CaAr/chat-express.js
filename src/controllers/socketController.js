// import { MessageUseCase } from "../use-cases/message.useCase.js";

export class SocketController {
  constructor(io, messageUseCase) {
    this.io = io;
    this.messageUseCase = messageUseCase;
  }

  initialize() {
    this.io.on("connection", async (socket) => {
      console.log("An user has connected");

      //Manejo de eventos de desconeccion
      socket.on("disconnect", () => {
        console.log("An user has disconnected");
      });

      //Manejo de solicitudes
      socket.on("chat message", async (msg) => {
        try {
          const messageId = await this.messageUseCase.createMessage(msg);
          this.io.emit("chat message", msg, messageId.toString());
        } catch (error) {
          console.error(
            "Ocurrio el siguiente error al intentar manejar la solicitud 'chat message' =>",
            error
          );
        }
      });

      //Reconneccion y recuperacion de mensajes
      if (!socket.recovered) {
        try {
          const lastMessageId = socket.handshake.auth.serverOffset ?? 0;
          const messages = await this.messageUseCase.getMessagesById(lastMessageId);
          messages.forEach(({ id, content }) => {
            socket.emit("chat message", content, id.toString());
          });
        } catch (error) {
          console.error(
            "Ocurrio el siguiente error al intentar recuperar los mensajes =>",
            error
          );
        }
      }
    });
  }
}
