import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./lib/db",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
