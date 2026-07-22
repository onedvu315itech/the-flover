import { prisma } from "@repo/prisma/client";
import { TagType } from "@repo/prisma/generated/client/enums";
import tags from "./data/tags.json";

export async function seedTags() {
  console.log("🏷️ Seeding tags...");

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: {
        slug: tag.slug,
      },
      update: {
        name: tag.name,
        type: tag.type as TagType,
        isActive: true,
      },
      create: {
        name: tag.name,
        slug: tag.slug,
        type: tag.type as TagType,
        isActive: true,
      },
    });
  }

  console.log(`✅ Seeded ${tags.length} tags.`);
}