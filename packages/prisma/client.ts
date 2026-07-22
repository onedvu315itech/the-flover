import { config } from "dotenv"
import { resolve } from "node:path"

config({
  path: resolve(__dirname, "../../.env"),
})

import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "./generated/client/client"

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})

export const prisma = new PrismaClient({
  adapter,
})