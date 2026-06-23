import "dotenv/config";
import { defineConfig, env } from "prisma/config";
const databaseUrl = process.env.DATABASE_URL;
console.log("DATABASE_URL:", databaseUrl);
if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing");
}
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DATABASE_URL") },
});
