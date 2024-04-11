import { createClient } from "@libsql/client";

export class CreateTables {
  constructor() {
    this.db = createClient({
      url: "libsql://superb-fathom-miguel-caar.turso.io",
      authToken: process.env.DB_TOKEN,
    });
  }

  async tableUser() {
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        picture TEXT,
      )
    `);
  }

  async tableMessage() {
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        user INTEGER,
      )
    `);
  }
}
