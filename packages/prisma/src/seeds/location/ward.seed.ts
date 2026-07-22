import { prisma } from "@repo/prisma/client";
import wards from "./data/wards.json";

export async function seedWards() {
  console.log("🏘️ Seeding wards...");

  for (const ward of wards) {
    const province = await prisma.province.findUnique({
      where: {
        code: ward.provinceCode,
      },
    });

    if (!province) {
      console.warn(
        `⚠️ Province "${ward.provinceCode}" not found. Skipping "${ward.name}".`
      );
      continue;
    }

    await prisma.ward.upsert({
      where: {
        provinceId_code: {
          provinceId: province.id,
          code: ward.code,
        },
      },
      update: {
        name: ward.name,
        isActive: true,
      },
      create: {
        provinceId: province.id,
        code: ward.code,
        name: ward.name,
        isActive: true,
      },
    });
  }

  console.log(`✅ Seeded ${wards.length} wards.`);
}