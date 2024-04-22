import { createClient } from "@libsql/client";
import { Message } from "../../entities/message.js";

export class SQLite {
  constructor() {
    this.db = createClient({
      url: "libsql://superb-fathom-miguel-caar.turso.io",
      authToken: process.env.DB_TOKEN,
    });
  }

  async create(message) {
    const result = await this.db.execute({
      sql: "INSERT INTO messages (content, user) VALUES (:msg, :user)",
      args: { msg: message.content, user: message.user },
    });
    return result.lastInsertRowid;
  }

  async getAllById(id) {
    const result = await this.db.execute({
      sql: "SELECT * FROM messages WHERE id > ?",
      args: [id],
    });
    return result.rows.map((row) => new Message(row.id, row.content, row.user));
  }
}
