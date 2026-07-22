import { prisma } from "@repo/prisma/client";
import provinces from "./data/provinces.json";

export async function seedProvinces() {
  console.log("📍 Seeding provinces...");

  for (const province of provinces) {
    await prisma.province.upsert({
      where: {
        code: province.code,
      },
      update: {
        name: province.name,
        isActive: true,
      },
      create: {
        code: province.code,
        name: province.name,
        isActive: true,
      },
    });
  }

  console.log(`✅ Seeded ${provinces.length} provinces.`);
}