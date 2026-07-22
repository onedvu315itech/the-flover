
import { prisma } from "@repo/prisma/client";
import designs from "./data/designs.json";

export async function seedDesigns() {
  console.log("🌸 Seeding designs...");

  for (const item of designs) {
    const category = await prisma.category.findUnique({
      where: {
        slug: item.categorySlug,
      },
    });

    if (!category) {
      console.warn(`Category "${item.categorySlug}" not found.`);
      continue;
    }

    const design = await prisma.design.upsert({
      where: {
        slug: item.slug,
      },
      update: {
        name: item.name,
        shortDescription: item.shortDescription,
        description: item.description,
        startingPrice: item.startingPrice,
        referencePrice: item.referencePrice,
        coverImage: item.coverImage,
        isFeatured: item.isFeatured,
        isActive: true,
        isPurchasable: true,
      },
      create: {
        categoryId: category.id,
        name: item.name,
        slug: item.slug,
        shortDescription: item.shortDescription,
        description: item.description,
        startingPrice: item.startingPrice,
        referencePrice: item.referencePrice,
        coverImage: item.coverImage,
        isFeatured: item.isFeatured,
        isActive: true,
        isPurchasable: true,
      },
    });

    await prisma.designTag.deleteMany({
      where: {
        designId: design.id,
      },
    });

    for (const tagSlug of item.tags) {
      const tag = await prisma.tag.findUnique({
        where: {
          slug: tagSlug,
        },
      });

      if (!tag) continue;

      await prisma.designTag.create({
        data: {
          designId: design.id,
          tagId: tag.id,
        },
      });
    }
  }

  console.log(`✅ Seeded ${designs.length} designs.`);
}