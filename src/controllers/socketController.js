// import { MessageUseCase } from "../use-cases/message.useCase.js";

export class SocketController {
  constructor(io, tablesUseCase, usersUseCase, messageUseCase) {
    this.io = io;
    this.tablesUseCase = tablesUseCase;
    this.usersUseCase = usersUseCase;
    this.messageUseCase = messageUseCase;
  }

  initialize() {
    this.io.on("connection", async (socket) => {
      console.log("🟢 An user has connected");

      //Manejo de eventos de desconeccion
      socket.on("disconnect", () => {
        console.log("🔴 An user has disconnected");
      });

      //Creamos las tablas en caso de no estar creadas anteriormente
      try {
        this.tablesUseCase.createTableUsers();
        this.tablesUseCase.createTableMessages();
        this.tablesUseCase.createTableUsers();
      } catch (error) {
        console.error(
          "Ocurrio el siguiente error al intentar manejar la solicitud 'Crear Tablas' => ",
          error
        );
      }

      //Manejo de solicitudes para crear el usuario
      socket.on("create user", async (name, picture, password) => {
        try {
          const userId = await this.usersUseCase.createUser(
            name,
            picture,
            password
          );
          this.io.emit("create user", name, picture, userId.toString());
          console.log("🙎‍♂️ User created");
        } catch (error) {
          console.error(
            "Ocurrio el siguiente error al intentar manejar la solicitud 'create user' => ",
            error
          );
        }
      });

      //Manejo de solicitudes para crear mensaje
      socket.on("chat message", async (content, userId) => {
        try {
          const messageId = await this.messageUseCase.createMessage(
            content,
            userId
          );
          this.io.emit(
            "chat message",
            content,
            messageId.toString(),
            userId.toString()
          );
          console.log("📩 Message created");
        } catch (error) {
          console.error(
            `Ocurrio el siguiente error al intentar manejar la solicitud 'chat message' =>
            \ncontent: ${typeof content}
            \nmessageId: ${typeof messageId}
            \nuserId: ${typeof userId}\n
            `,
            error
          );
        }
      });

      socket.on("get all messages", async () => {
        //Reconneccion y recuperacion de mensajes
        if (!socket.recovered) {
          try {
            const lastMessageId = socket.handshake.auth.serverOffset ?? 0;
            const messages = await this.messageUseCase.getMessagesById(
              lastMessageId
            );
            messages.forEach(({ id, content, user }) => {
              socket.emit(
                "chat message",
                content,
                id.toString(),
                user.toString()
              );
            });
          } catch (error) {
            console.error(
              `Ocurrio el siguiente error al intentar recuperar los mensajes => 
          \ncontent: ${typeof content}\nid: ${typeof id}\nuser:${typeof user}\n`,
              error
            );
          }
        }
      });
    });
  }
}
