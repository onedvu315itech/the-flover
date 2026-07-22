import { config } from "dotenv";
import { resolve } from "node:path";
import { defineConfig } from "prisma/config";

config({
  path: resolve(__dirname, "../../.env"),
});

export default defineConfig({
  schema: "schema.prisma",

  migrations: {
    path: "src/migrations",
    seed: "tsx src/seeds/index.ts",
  },

  datasource: {
    url: process.env.DATABASE_URL!,
  },
});