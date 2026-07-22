import { seedRoles } from "./auth/role.seed"

import { seedProvinces } from "./location/province.seed";
import { seedWards } from "./location/ward.seed";

import { seedCategories } from "./catalog/category.seed";
import { seedTags } from "./catalog/tag.seed";
import { seedDesigns } from "./demo/design.seed";

import { prisma } from "@repo/prisma/client";

async function main() {
  console.log("🌱 Starting database seeding...\n");

  try {
    // ===========================
    // Authentication
    // ===========================
    await seedRoles();

    // ===========================
    // Location
    // ===========================
    await seedProvinces();
    await seedWards();

    // ===========================
    // Catalog
    // ===========================
    await seedCategories();
    await seedTags();
    await seedDesigns();

    console.log("\n🎉 Database seeding completed successfully.");
  } catch (error) {
    console.error("\n❌ Database seeding failed.");
    console.error(error);

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })