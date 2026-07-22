import { prisma } from "@repo/prisma/client";
import categories from "./data/categories.json";

export async function seedCategories() {
  console.log("🌸 Seeding categories...");

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: {
        name: category.name,
        description: category.description,
        displayOrder: category.displayOrder,
        isActive: true,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        displayOrder: category.displayOrder,
        isActive: true,
      },
    });
  }

  console.log(`✅ Seeded ${categories.length} categories.`);
}