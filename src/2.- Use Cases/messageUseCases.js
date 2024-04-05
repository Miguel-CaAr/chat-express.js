import { Message } from "../1.- Entities/messaje.js";

export async function sendMessage(db, content) {
  //* Logica para enviar un msj
  try {
    const result = await db.execute({
      sql: `INSERT INTO messages (content) VALUES (:msg)`,
      args: { msg: content },
    });
    return new Message(result.lastInsertRowid.toString(), content);
  } catch (error) {}
  console.error(error);
  throw new Error("Error al enviar el mensaje");
}

export async function getMessages(db, num) {
  //* Logica para obtener los mensajes
  try {
    const result = await db.execute({
      sql: `SELECT id, content FROM messages WHERE id > ?`,
      args: [num],
    });
    return result.rows.map(
      (row) => new Message(row.id.toString(), row.content)
    );
  } catch (error) {
    console.error(error);
    throw new Error("Erorr al obtener los mensajes");
  }
}
