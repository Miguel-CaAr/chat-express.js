import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

export function configureDatabase() {
  return createClient({
    url: "libsql://superb-fathom-miguel-caar.turso.io",
    authToken: process.env.DB_TOKEN,
  });
}
