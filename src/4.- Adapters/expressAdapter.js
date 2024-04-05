import logger from "morgan";
import { handleMessage } from "../3.- Interactors/messageInteractor.js";

export function configureApp(db, io, port, app) {
  app.use(logger("dev"));

  app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/client/index.html");
  });

  io.on("connection", (socket) => {
    console.log("An user has connected");
    handleMessage(socket, db, io, socket.handshake.auth.serverOffset ?? 0);
    
    socket.on("disconnect", () => {
      console.log("An user has disconnecteds");
    });
  });  
  
  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
}
