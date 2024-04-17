import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { SQLite as SQLite_Messages } from "./src/repositories/SQLite/messageRepository.js";
import { SQLite as SQLite_Users } from "./src/repositories/SQLite/userRepository.js";
import { CreateTables } from "./src/repositories/SQLite/tablesRepository.js";
import { TablesUseCase } from "./src/use-cases/tables.useCase.js";
import { UsersUseCase } from "./src/use-cases/users.userCase.js";
import { MessageUseCase } from "./src/use-cases/message.useCase.js";
import { SocketController } from "./src/controllers/socketController.js";

dotenv.config();
const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  },
  connectionStateRecovery: {},
});

//Repositories
const tablesRepository = new CreateTables();
const usersRepository = new SQLite_Users();
const messageRepository = new SQLite_Messages();
//Use cases
const tablesUseCase = new TablesUseCase(tablesRepository);
const usersUseCase = new UsersUseCase(usersRepository);
const messageUseCase = new MessageUseCase(messageRepository);
//Controller
const socketController = new SocketController(io,tablesUseCase, usersUseCase, messageUseCase);
socketController.initialize();

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

server.listen(port, () => {
  console.log(`Server running ${port}`);
});
