import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";
import dotenv from "dotenv";
import { SQLite } from "./src/repositories/SQLite/messageRepository.js";
import { SocketController } from "./src/controllers/socketController.js";
import { MessageUseCase } from "./src/use-cases/message.useCase.js";

dotenv.config();
const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

const messageRepository = new SQLite();
const messageUseCase = new MessageUseCase(messageRepository);
const socketController = new SocketController(io, messageUseCase);
socketController.initialize();

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

server.listen(port, () => {
  console.log(`Server running ${port}`);
});
