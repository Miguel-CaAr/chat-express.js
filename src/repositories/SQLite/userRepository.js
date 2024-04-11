import { createClient } from "@libsql/client";
import { User } from "../../entities/user.js";

export class SQLite {
  constructor() {
    this.db = createClient({
      url: "libsql://superb-fathom-miguel-caar.turso.io",
      authToken: process.env.DB_TOKEN,
    });
  }

  async create(user) {
    const result = await this.db.execute({
      sql: "INSERT INTO users (name, picture) VALUES (:name, :picture)",
      args: { name: user.name, picture: user.picture },
    });
    return result.lastInsertRowid;
  }

  async getAllById(id) {
    const result = await this.db.execute({
      sql: "SELECT * FROM users WHERE id > ?",
      args: [id],
    });
    return result.rows.map((row) => new User(row.id, row.name, row.picture));
  }
}
